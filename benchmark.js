#!/usr/bin/env node

"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const { spawn } = require("node:child_process");

const ROOT_DIR = __dirname;
const DEFAULT_REPORT_PATH = "benchmark-report.md";
const ARTIFACTS_DIR = path.join(ROOT_DIR, "benchmark-artifacts");

const PROJECTS = [
  {
    name: "GenerateSerializer",
    projectPath: ".\\src\\Orleans.CodeGen.Benchmark.GenerateSerializer\\Orleans.CodeGen.Benchmark.GenerateSerializer.csproj",
    binlogName: "GenerateSerializer.binlog",
  },
  {
    name: "Normal",
    projectPath: ".\\src\\Orleans.CodeGen.Benchmark.Normal\\Orleans.CodeGen.Benchmark.Normal.csproj",
    binlogName: "Normal.binlog",
  },
];

function parseArgs(argv) {
  const options = {
    reportPath: DEFAULT_REPORT_PATH,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--report") {
      const value = argv[++i];
      if (!value) {
        throw new Error("--report requires a path value.");
      }
      options.reportPath = value;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function printHelp() {
  console.log(`Usage: node benchmark.js [options]

Options:
  --report <path>  Markdown report output path (default: ${DEFAULT_REPORT_PATH})
  --help, -h       Show this help
`);
}

function nowUtcIso() {
  return new Date().toISOString();
}

function toMs(startNs, endNs) {
  return Number(endNs - startNs) / 1_000_000;
}

function formatSec(ms) {
  return (ms / 1000).toFixed(3);
}

function escapeMd(value) {
  return String(value).replace(/\|/g, "\\|");
}

function normalizePathForReport(p) {
  return p.replaceAll("\\", "\\\\");
}

function commandToReportString(command, args) {
  const executable = path.parse(command).name.toLowerCase();
  if (executable === "dotnet" && args[0] === "build") {
    const configurationIndex = args.indexOf("-c");
    if (configurationIndex >= 0 && configurationIndex + 1 < args.length) {
      return [executable, ...args.slice(0, configurationIndex + 2)].join(" ");
    }

    const verbosityIndex = args.indexOf("-v");
    const cutoff = verbosityIndex >= 0 ? verbosityIndex : args.length;
    return [executable, ...args.slice(0, cutoff)].join(" ");
  }

  return executable;
}

function runCommand(stepName, command, args) {
  return new Promise((resolve, reject) => {
    const startedNs = process.hrtime.bigint();
    const child = spawn(command, args, {
      cwd: ROOT_DIR,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      stdout += text;
      process.stdout.write(text);
    });

    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      stderr += text;
      process.stderr.write(text);
    });

    child.on("error", (error) => {
      const endedNs = process.hrtime.bigint();
      reject({
        stepName,
        command,
        args,
        durationMs: toMs(startedNs, endedNs),
        stdout,
        stderr,
        error,
      });
    });

    child.on("close", (code, signal) => {
      const endedNs = process.hrtime.bigint();
      resolve({
        stepName,
        command,
        args,
        exitCode: code,
        signal,
        durationMs: toMs(startedNs, endedNs),
        stdout,
        stderr,
      });
    });
  });
}

function parsePerformanceSection(lines, heading) {
  const rows = [];
  let inSection = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!inSection) {
      if (trimmed.toLowerCase() === `${heading.toLowerCase()}:`) {
        inSection = true;
      }
      continue;
    }

    if (trimmed.length === 0) {
      if (rows.length > 0) {
        break;
      }
      continue;
    }

    if (trimmed.endsWith(":")) {
      break;
    }

    const match = trimmed.match(/^(\d+)\s+ms\s+(.+?)\s+(\d+)\s+calls?$/i);
    if (!match) {
      continue;
    }

    rows.push({
      timeMs: Number.parseInt(match[1], 10),
      name: match[2].trim(),
      calls: Number.parseInt(match[3], 10),
    });
  }

  return rows;
}

function parseBuildDetails(logText) {
  const lines = logText.split(/\r?\n/);
  const taskRows = parsePerformanceSection(lines, "Task Performance Summary");
  const targetRows = parsePerformanceSection(lines, "Target Performance Summary");
  const warningCount = (logText.match(/\bwarning\b/gi) || []).length;
  const errorCount = (logText.match(/\berror\b/gi) || []).length;

  return {
    taskRows,
    targetRows,
    warningCount,
    errorCount,
    parsedSummary: taskRows.length > 0 || targetRows.length > 0,
  };
}

function renderRowsTable(rows, nameColumn) {
  if (rows.length === 0) {
    return "_No parsed rows available from this build output._\n";
  }

  const topRows = [...rows].sort((a, b) => b.timeMs - a.timeMs).slice(0, 20);
  const tableLines = [
    `| ${nameColumn} | Time (s) | Calls |`,
    "| --- | ---: | ---: |",
  ];

  for (const row of topRows) {
    tableLines.push(`| ${escapeMd(row.name)} | ${formatSec(row.timeMs)} | ${row.calls} |`);
  }

  return `${tableLines.join("\n")}\n`;
}

function buildSharedComparisonRows(leftRows, rightRows) {
  const rightByName = new Map(rightRows.map((row) => [row.name, row]));
  const rows = [];

  for (const left of leftRows) {
    const right = rightByName.get(left.name);
    if (!right) {
      continue;
    }

    rows.push({
      name: left.name,
      leftTimeMs: left.timeMs,
      rightTimeMs: right.timeMs,
      deltaTimeMs: Math.abs(left.timeMs - right.timeMs),
      leftCalls: left.calls,
      rightCalls: right.calls,
    });
  }

  return rows.sort((a, b) => b.deltaTimeMs - a.deltaTimeMs);
}

function renderBuildSummaryComparisonTable(leftBuild, rightBuild) {
  const tableLines = [
    "| Metric | GenerateSerializer | Normal | Delta |",
    "| --- | ---: | ---: | ---: |",
    `| Build Duration (s) | ${formatSec(leftBuild.durationMs)} | ${formatSec(rightBuild.durationMs)} | ${formatSec(Math.abs(leftBuild.durationMs - rightBuild.durationMs))} |`,
    `| Warnings | ${leftBuild.warningCount} | ${rightBuild.warningCount} | ${Math.abs(leftBuild.warningCount - rightBuild.warningCount)} |`,
    `| Errors | ${leftBuild.errorCount} | ${rightBuild.errorCount} | ${Math.abs(leftBuild.errorCount - rightBuild.errorCount)} |`,
  ];

  return `${tableLines.join("\n")}\n`;
}

function renderSharedComparisonTable(rows, nameColumn) {
  if (rows.length === 0) {
    return "_No shared rows available for comparison._\n";
  }

  const tableLines = [
    `| ${nameColumn} | GenerateSerializer (s) | Normal (s) | Delta (s) | GenerateSerializer Calls | Normal Calls |`,
    "| --- | ---: | ---: | ---: | ---: | ---: |",
  ];

  for (const row of rows) {
    tableLines.push(
      `| ${escapeMd(row.name)} | ${formatSec(row.leftTimeMs)} | ${formatSec(row.rightTimeMs)} | ${formatSec(row.deltaTimeMs)} | ${row.leftCalls} | ${row.rightCalls} |`,
    );
  }

  return `${tableLines.join("\n")}\n`;
}

function renderReport(report) {
  const lines = [];
  lines.push("# Benchmark Report");
  lines.push("");
  lines.push("## Run Metadata");
  lines.push("");
  lines.push("| Key | Value |");
  lines.push("| --- | --- |");
  lines.push(`| Started (UTC) | ${report.startedAtUtc} |`);
  lines.push(`| Finished (UTC) | ${report.finishedAtUtc} |`);
  lines.push(`| Status | ${report.status} |`);
  lines.push(`| Total Duration (s) | ${formatSec(report.totalDurationMs)} |`);
  lines.push(`| Report Path | ${escapeMd(normalizePathForReport(report.reportPath))} |`);
  lines.push("");

  lines.push("## Command Timing Summary");
  lines.push("");
  lines.push("| Step | Command | Exit Code | Duration (s) | Status |");
  lines.push("| --- | --- | ---: | ---: | --- |");
  for (const step of report.steps) {
    lines.push(
      `| ${escapeMd(step.stepName)} | ${escapeMd(commandToReportString(step.command, step.args))} | ${step.exitCode ?? -1} | ${formatSec(step.durationMs)} | ${step.status} |`,
    );
  }
  lines.push("");

  lines.push("## Compile Detail Breakdown");
  lines.push("");

  for (const build of report.builds) {
    lines.push(`### ${build.projectName}`);
    lines.push("");
    lines.push("| Metric | Value |");
    lines.push("| --- | --- |");
    lines.push(`| Build Duration (s) | ${formatSec(build.durationMs)} |`);
    lines.push(`| Exit Code | ${build.exitCode} |`);
    lines.push(`| Warnings (log match count) | ${build.warningCount} |`);
    lines.push(`| Errors (log match count) | ${build.errorCount} |`);
    lines.push(`| Performance Summary Parsed | ${build.parsedSummary ? "Yes" : "No"} |`);
    lines.push(`| Binlog | ${escapeMd(normalizePathForReport(build.binlogPath))} |`);
    lines.push("");

    lines.push("#### Slowest Targets");
    lines.push("");
    lines.push(renderRowsTable(build.targetRows, "Target").trimEnd());
    lines.push("");

    lines.push("#### Slowest Tasks");
    lines.push("");
    lines.push(renderRowsTable(build.taskRows, "Task").trimEnd());
    lines.push("");
  }

  lines.push("## Build Mode Comparison");
  lines.push("");

  const generateSerializerBuild = report.builds.find((build) => build.projectName === "GenerateSerializer");
  const normalBuild = report.builds.find((build) => build.projectName === "Normal");

  if (!generateSerializerBuild || !normalBuild) {
    lines.push("_Comparison requires both GenerateSerializer and Normal build results._");
    lines.push("");
  } else {
    lines.push("### Summary");
    lines.push("");
    lines.push(renderBuildSummaryComparisonTable(generateSerializerBuild, normalBuild).trimEnd());
    lines.push("");

    const targetComparisonRows = buildSharedComparisonRows(generateSerializerBuild.targetRows, normalBuild.targetRows);
    lines.push("### Shared Slowest Targets (name-matched)");
    lines.push("");
    lines.push(renderSharedComparisonTable(targetComparisonRows, "Target").trimEnd());
    lines.push("");

    const taskComparisonRows = buildSharedComparisonRows(generateSerializerBuild.taskRows, normalBuild.taskRows);
    lines.push("### Shared Slowest Tasks (name-matched)");
    lines.push("");
    lines.push(renderSharedComparisonTable(taskComparisonRows, "Task").trimEnd());
    lines.push("");
  }

  if (report.status !== "success") {
    lines.push("## Failure");
    lines.push("");
    lines.push("The benchmark stopped at the first failed step. See command output above and generated binlogs for diagnostics.");
    lines.push("");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

async function ensureArtifactsDir() {
  await fs.rm(ARTIFACTS_DIR, { recursive: true, force: true });
  await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
}

async function writeReport(reportPath, content) {
  const fullPath = path.isAbsolute(reportPath) ? reportPath : path.join(ROOT_DIR, reportPath);
  const parent = path.dirname(fullPath);
  await fs.mkdir(parent, { recursive: true });
  await fs.writeFile(fullPath, content, "utf8");
  return fullPath;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  await ensureArtifactsDir();

  const startedAtUtc = nowUtcIso();
  const totalStartNs = process.hrtime.bigint();
  const steps = [];
  const builds = [];
  let status = "success";

  const codegenArgs = [
    ".\\codegen.js",
    "--count",
    "3000",
    "--min-props",
    "100",
    "--max-props",
    "200",
    "--seed",
    "orleans-codegen-benchmark",
  ];

  const codegenResult = await runCommand("Code generation", process.execPath, codegenArgs);
  steps.push({
    ...codegenResult,
    status: codegenResult.exitCode === 0 ? "success" : "failed",
  });

  if (codegenResult.exitCode !== 0) {
    status = "failed";
  }

  if (status === "success") {
    for (const project of PROJECTS) {
      const binlogPath = path.join(ARTIFACTS_DIR, project.binlogName);
      const buildArgs = [
        "build",
        project.projectPath,
        "-c",
        "Release",
        "-v",
        "minimal",
        "--nologo",
        "/clp:PerformanceSummary;Summary",
        `/bl:${binlogPath}`,
      ];

      const buildResult = await runCommand(`${project.name} build`, "dotnet", buildArgs);
      const buildStatus = buildResult.exitCode === 0 ? "success" : "failed";

      steps.push({
        ...buildResult,
        status: buildStatus,
      });

      const detail = parseBuildDetails(`${buildResult.stdout}\n${buildResult.stderr}`);
      builds.push({
        projectName: project.name,
        durationMs: buildResult.durationMs,
        exitCode: buildResult.exitCode ?? -1,
        warningCount: detail.warningCount,
        errorCount: detail.errorCount,
        parsedSummary: detail.parsedSummary,
        targetRows: detail.targetRows,
        taskRows: detail.taskRows,
        binlogPath,
      });

      if (buildResult.exitCode !== 0) {
        status = "failed";
        break;
      }
    }
  }

  const totalEndNs = process.hrtime.bigint();
  const report = {
    startedAtUtc,
    finishedAtUtc: nowUtcIso(),
    totalDurationMs: toMs(totalStartNs, totalEndNs),
    status,
    steps,
    builds,
    reportPath: options.reportPath,
  };

  const reportContent = renderReport(report);
  const finalReportPath = await writeReport(options.reportPath, reportContent);
  console.log(`Benchmark report written to: ${finalReportPath}`);

  if (status !== "success") {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
