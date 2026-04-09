#!/usr/bin/env node

"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");

const DEFAULTS = {
  dtoCount: 10000,
  minProps: 100,
  maxProps: 200,
  seed: "orleans-codegen-benchmark",
};

const ROOT_DIR = __dirname;
const TARGETS = [
  {
    project: "Orleans.CodeGen.Benchmark.GenerateSerializer",
    namespace: "Orleans.CodeGen.Benchmark.GenerateSerializer.DTO",
    withAttributes: true,
  },
  {
    project: "Orleans.CodeGen.Benchmark.Normal",
    namespace: "Orleans.CodeGen.Benchmark.Normal.DTO",
    withAttributes: false,
  },
];

const VALUE_TYPES = ["int", "long", "bool", "double", "decimal", "Guid", "DateTime"];
const REF_TYPES = ["string"];
const ALL_SCALAR_TYPES = [...VALUE_TYPES, ...REF_TYPES];

function parseArgs(argv) {
  const options = {
    dtoCount: DEFAULTS.dtoCount,
    minProps: DEFAULTS.minProps,
    maxProps: DEFAULTS.maxProps,
    seed: DEFAULTS.seed,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--count") {
      options.dtoCount = parseIntOrThrow(argv[++i], "--count");
    } else if (arg === "--min-props") {
      options.minProps = parseIntOrThrow(argv[++i], "--min-props");
    } else if (arg === "--max-props") {
      options.maxProps = parseIntOrThrow(argv[++i], "--max-props");
    } else if (arg === "--seed") {
      options.seed = argv[++i];
      if (!options.seed) {
        throw new Error("--seed requires a value.");
      }
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (options.dtoCount <= 0) {
    throw new Error("--count must be > 0.");
  }
  if (options.minProps <= 0) {
    throw new Error("--min-props must be > 0.");
  }
  if (options.maxProps < options.minProps) {
    throw new Error("--max-props must be >= --min-props.");
  }
  if (options.maxProps > 1000) {
    throw new Error("--max-props is unexpectedly large. Refusing values > 1000.");
  }

  return options;
}

function parseIntOrThrow(value, name) {
  if (value === undefined) {
    throw new Error(`${name} requires a numeric value.`);
  }
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${name} must be an integer.`);
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node codegen.js [options]

Options:
  --count <n>       Number of DTOs (default: ${DEFAULTS.dtoCount})
  --min-props <n>   Minimum properties per DTO (default: ${DEFAULTS.minProps})
  --max-props <n>   Maximum properties per DTO (default: ${DEFAULTS.maxProps})
  --seed <value>    Deterministic seed (default: "${DEFAULTS.seed}")
  --help, -h        Show this help
`);
}

function hashSeed(seedText) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < seedText.length; i += 1) {
    hash ^= seedText.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

function createRng(seedText) {
  let state = hashSeed(seedText) || 0x6d2b79f5;
  return function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomIntInclusive(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function dtoName(index) {
  return `Dto${String(index + 1).padStart(5, "0")}`;
}

function propertyName(index) {
  return `P${String(index).padStart(3, "0")}`;
}

function choosePropertySchema(rng, dtoCount) {
  const kindRoll = rng();
  if (kindRoll < 0.34) {
    const scalar = ALL_SCALAR_TYPES[randomIntInclusive(rng, 0, ALL_SCALAR_TYPES.length - 1)];
    return { kind: "scalar", typeName: scalar };
  }
  if (kindRoll < 0.67) {
    const targetDto = dtoName(randomIntInclusive(rng, 0, dtoCount - 1));
    return { kind: "dto", typeName: targetDto };
  }

  const useDtoElement = rng() < 0.5;
  if (useDtoElement) {
    const elementDto = dtoName(randomIntInclusive(rng, 0, dtoCount - 1));
    return { kind: "list", typeName: `List<${elementDto}>` };
  }

  const elementType = ALL_SCALAR_TYPES[randomIntInclusive(rng, 0, ALL_SCALAR_TYPES.length - 1)];
  return { kind: "list", typeName: `List<${elementType}>` };
}

function buildPropertyLine(propertySchema, propertyIndex, withAttributes) {
  const lines = [];
  if (withAttributes) {
    lines.push(`    [Id(${propertyIndex})]`);
  }

  const name = propertyName(propertyIndex);
  const typeName = propertySchema.typeName;
  let initializer = "";

  if (propertySchema.kind === "scalar") {
    if (typeName === "string") {
      initializer = " = string.Empty;";
    }
  } else if (propertySchema.kind === "dto" || propertySchema.kind === "list") {
    initializer = " = new();";
  }

  lines.push(`    public ${typeName} ${name} { get; set; }${initializer}`);
  return lines.join("\n");
}

function renderDtoFile(dtoNameValue, namespaceValue, withAttributes, propertySchemas) {
  const lines = [];
  lines.push("using System;");
  lines.push("using System.Collections.Generic;");
  if (withAttributes) {
    lines.push("using Orleans;");
    lines.push("using Orleans.Concurrency;");
  }
  lines.push("");
  lines.push(`namespace ${namespaceValue};`);
  lines.push("");

  if (withAttributes) {
    lines.push("[Serializable]");
    lines.push("[Immutable]");
    lines.push("[GenerateSerializer]");
  }
  lines.push(`public sealed class ${dtoNameValue}`);
  lines.push("{");

  for (let i = 0; i < propertySchemas.length; i += 1) {
    if (i > 0) {
      lines.push("");
    }
    lines.push(buildPropertyLine(propertySchemas[i], i, withAttributes));
  }

  lines.push("}");
  lines.push("");
  return lines.join("\n");
}

async function resetTargetDirectories() {
  for (const target of TARGETS) {
    const dtoDir = path.join(ROOT_DIR, "src", target.project, "DTO");
    await fs.rm(dtoDir, { recursive: true, force: true });
    await fs.mkdir(dtoDir, { recursive: true });
  }
}

async function generate(options) {
  const rng = createRng(options.seed);
  await resetTargetDirectories();

  const targetDirs = TARGETS.map((target) => ({
    ...target,
    dtoDir: path.join(ROOT_DIR, "src", target.project, "DTO"),
  }));

  for (let dtoIndex = 0; dtoIndex < options.dtoCount; dtoIndex += 1) {
    const className = dtoName(dtoIndex);
    const propertyCount = randomIntInclusive(rng, options.minProps, options.maxProps);
    const propertySchemas = new Array(propertyCount);

    for (let p = 0; p < propertyCount; p += 1) {
      propertySchemas[p] = choosePropertySchema(rng, options.dtoCount);
    }

    for (const target of targetDirs) {
      const content = renderDtoFile(
        className,
        target.namespace,
        target.withAttributes,
        propertySchemas,
      );
      const filePath = path.join(target.dtoDir, `${className}.cs`);
      await fs.writeFile(filePath, content, "utf8");
    }
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  await generate(options);
  console.log(
    `Generated ${options.dtoCount} DTOs per project with ${options.minProps}-${options.maxProps} properties (seed: "${options.seed}").`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
