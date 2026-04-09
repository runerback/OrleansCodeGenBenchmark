# Benchmark Report

## Run Metadata

| Key | Value |
| --- | --- |
| Started (UTC) | 2026-04-09T06:16:28.397Z |
| Finished (UTC) | 2026-04-09T06:27:06.979Z |
| Status | success |
| Total Duration (s) | 638.584 |
| Report Path | benchmark-report.md |

## Command Timing Summary

| Step | Command | Exit Code | Duration (s) | Status |
| --- | --- | ---: | ---: | --- |
| Code generation | node | 0 | 2.469 | success |
| GenerateSerializer build | dotnet build .\src\Orleans.CodeGen.Benchmark.GenerateSerializer\Orleans.CodeGen.Benchmark.GenerateSerializer.csproj -c Release | 0 | 560.245 | success |
| Normal build | dotnet build .\src\Orleans.CodeGen.Benchmark.Normal\Orleans.CodeGen.Benchmark.Normal.csproj -c Release | 0 | 75.869 | success |

## Compile Detail Breakdown

### GenerateSerializer

| Metric | Value |
| --- | --- |
| Build Duration (s) | 560.245 |
| Exit Code | 0 |
| Warnings (log match count) | 1 |
| Errors (log match count) | 1 |
| Performance Summary Parsed | Yes |
| Binlog | G:\\D\\Projects\\dotnet\\orleans_codegen_benchmark\\benchmark-artifacts\\GenerateSerializer.binlog |

#### Slowest Targets

| Target | Time (s) | Calls |
| --- | ---: | ---: |
| CoreCompile | 556.786 | 1 |
| Restore | 1.995 | 1 |
| _GenerateRestoreGraph | 0.115 | 1 |
| ResolveAssemblyReferences | 0.080 | 1 |
| CopyFilesToOutputDirectory | 0.071 | 1 |
| ResolvePackageAssets | 0.066 | 1 |
| ProcessFrameworkReferences | 0.049 | 2 |
| _FilterRestoreGraphProjectInputItems | 0.046 | 1 |
| GenerateBuildDependencyFile | 0.040 | 1 |
| _GetRestoreSettings | 0.035 | 1 |
| InitializeSourceControlInformationFromSourceControlManager | 0.028 | 1 |
| _GetRestoreTargetFrameworkOverride | 0.019 | 1 |
| FindReferenceAssembliesForReferences | 0.019 | 1 |
| SetEmbeddedFilesFromSourceControlManagerUntrackedFiles | 0.018 | 1 |
| GetCopyToOutputDirectoryItems | 0.010 | 1 |
| _HandlePackageFileConflicts | 0.009 | 1 |
| GenerateGlobalUsings | 0.008 | 1 |
| AddPrunePackageReferences | 0.007 | 1 |
| _LoadRestoreGraphEntryPoints | 0.007 | 1 |
| _CheckForCompileOutputs | 0.006 | 1 |

#### Slowest Tasks

| Task | Time (s) | Calls |
| --- | ---: | ---: |
| Csc | 556.782 | 1 |
| RestoreTask | 1.994 | 1 |
| MSBuild | 0.151 | 7 |
| ResolveAssemblyReference | 0.079 | 1 |
| ResolvePackageAssets | 0.065 | 1 |
| Copy | 0.054 | 2 |
| GenerateDepsFile | 0.039 | 1 |
| ProcessFrameworkReferences | 0.038 | 2 |
| GetRestoreSettingsTask | 0.035 | 1 |
| Microsoft.Build.Tasks.Git.LocateRepository | 0.027 | 1 |
| Microsoft.Build.Tasks.Git.GetUntrackedFiles | 0.018 | 1 |
| CopyRefAssembly | 0.015 | 1 |
| WriteLinesToFile | 0.011 | 5 |
| ResolveAppHosts | 0.009 | 2 |
| ResolvePackageFileConflicts | 0.008 | 1 |
| CallTarget | 0.008 | 2 |
| GetPackagesToPrune | 0.007 | 1 |
| AllowEmptyTelemetry | 0.005 | 2 |
| GenerateGlobalUsings | 0.005 | 1 |
| WriteCodeFragment | 0.005 | 1 |

### Normal

| Metric | Value |
| --- | --- |
| Build Duration (s) | 75.869 |
| Exit Code | 0 |
| Warnings (log match count) | 1 |
| Errors (log match count) | 1 |
| Performance Summary Parsed | Yes |
| Binlog | G:\\D\\Projects\\dotnet\\orleans_codegen_benchmark\\benchmark-artifacts\\Normal.binlog |

#### Slowest Targets

| Target | Time (s) | Calls |
| --- | ---: | ---: |
| CoreCompile | 74.427 | 1 |
| Restore | 0.213 | 1 |
| _GenerateRestoreGraph | 0.115 | 1 |
| _FilterRestoreGraphProjectInputItems | 0.045 | 1 |
| CopyFilesToOutputDirectory | 0.044 | 1 |
| _GetRestoreSettings | 0.039 | 1 |
| ProcessFrameworkReferences | 0.038 | 2 |
| GenerateMSBuildEditorConfigFileCore | 0.037 | 1 |
| InitializeSourceControlInformationFromSourceControlManager | 0.028 | 1 |
| ResolvePackageAssets | 0.026 | 1 |
| ResolveAssemblyReferences | 0.019 | 1 |
| _GenerateDotnetCliToolReferenceSpecs | 0.018 | 1 |
| SetEmbeddedFilesFromSourceControlManagerUntrackedFiles | 0.017 | 1 |
| GetCopyToOutputDirectoryItems | 0.010 | 1 |
| GenerateBuildDependencyFile | 0.010 | 1 |
| _LoadRestoreGraphEntryPoints | 0.007 | 1 |
| GenerateGlobalUsings | 0.007 | 1 |
| _GetAllRestoreProjectPathItems | 0.006 | 1 |
| FindReferenceAssembliesForReferences | 0.006 | 1 |
| CheckForDuplicateItems | 0.006 | 1 |

#### Slowest Tasks

| Task | Time (s) | Calls |
| --- | ---: | ---: |
| Csc | 74.424 | 1 |
| RestoreTask | 0.213 | 1 |
| MSBuild | 0.150 | 7 |
| GetRestoreSettingsTask | 0.039 | 1 |
| GenerateMSBuildEditorConfig | 0.035 | 1 |
| ProcessFrameworkReferences | 0.034 | 2 |
| Copy | 0.030 | 2 |
| Microsoft.Build.Tasks.Git.LocateRepository | 0.027 | 1 |
| ResolvePackageAssets | 0.025 | 1 |
| ResolveAssemblyReference | 0.018 | 1 |
| Microsoft.Build.Tasks.Git.GetUntrackedFiles | 0.017 | 1 |
| CopyRefAssembly | 0.013 | 1 |
| WriteLinesToFile | 0.010 | 5 |
| CallTarget | 0.009 | 2 |
| GenerateDepsFile | 0.009 | 1 |
| WriteCodeFragment | 0.006 | 1 |
| CheckForDuplicateItems | 0.006 | 3 |
| GetPackagesToPrune | 0.006 | 1 |
| GenerateGlobalUsings | 0.005 | 1 |
| CheckForDuplicateNuGetItemsTask | 0.003 | 6 |

## Build Mode Comparison

### Summary

| Metric | GenerateSerializer | Normal | Delta |
| --- | ---: | ---: | ---: |
| Build Duration (s) | 560.245 | 75.869 | 484.376 |
| Warnings | 1 | 1 | 0 |
| Errors | 1 | 1 | 0 |

### Shared Slowest Targets (name-matched)

| Target | GenerateSerializer (s) | Normal (s) | Delta (s) | GenerateSerializer Calls | Normal Calls |
| --- | ---: | ---: | ---: | ---: | ---: |
| CoreCompile | 556.786 | 74.427 | 482.359 | 1 | 1 |
| Restore | 1.995 | 0.213 | 1.782 | 1 | 1 |
| ResolveAssemblyReferences | 0.080 | 0.019 | 0.061 | 1 | 1 |
| ResolvePackageAssets | 0.066 | 0.026 | 0.040 | 1 | 1 |
| GenerateMSBuildEditorConfigFileCore | 0.004 | 0.037 | 0.033 | 1 | 1 |
| GenerateBuildDependencyFile | 0.040 | 0.010 | 0.030 | 1 | 1 |
| CopyFilesToOutputDirectory | 0.071 | 0.044 | 0.027 | 1 | 1 |
| _GetRestoreTargetFrameworkOverride | 0.019 | 0.000 | 0.019 | 1 | 1 |
| _GenerateDotnetCliToolReferenceSpecs | 0.001 | 0.018 | 0.017 | 1 | 1 |
| FindReferenceAssembliesForReferences | 0.019 | 0.006 | 0.013 | 1 | 1 |
| ProcessFrameworkReferences | 0.049 | 0.038 | 0.011 | 2 | 2 |
| _CheckForCompileOutputs | 0.006 | 0.000 | 0.006 | 1 | 1 |
| _HandlePackageFileConflicts | 0.009 | 0.004 | 0.005 | 1 | 1 |
| _GetRestoreSettings | 0.035 | 0.039 | 0.004 | 1 | 1 |
| _CollectTargetFrameworkForTelemetry | 0.006 | 0.004 | 0.002 | 2 | 2 |
| _GenerateRestoreSpecs | 0.000 | 0.001 | 0.001 | 1 | 1 |
| ValidateExecutableReferences | 0.001 | 0.000 | 0.001 | 1 | 1 |
| _BlockWinMDsOnUnsupportedTFMs | 0.001 | 0.000 | 0.001 | 1 | 1 |
| CollectPrunePackageReferences | 0.001 | 0.000 | 0.001 | 1 | 1 |
| _InitializeBitbucketGitSourceLinkUrl | 0.002 | 0.001 | 0.001 | 2 | 2 |
| CheckForImplicitPackageReferenceOverrides | 0.002 | 0.003 | 0.001 | 2 | 2 |
| CollectPackageReferences | 0.002 | 0.001 | 0.001 | 2 | 2 |
| _InitializeGitHubSourceLinkUrl | 0.002 | 0.003 | 0.001 | 2 | 2 |
| ResolveOffByDefaultAnalyzers | 0.003 | 0.002 | 0.001 | 1 | 1 |
| _SetEmbeddedWin32ManifestProperties | 0.003 | 0.002 | 0.001 | 1 | 1 |
| ResolveFrameworkReferences | 0.003 | 0.002 | 0.001 | 1 | 1 |
| _GetCopyToOutputDirectoryItemsFromTransitiveProjectReferences | 0.004 | 0.005 | 0.001 | 1 | 1 |
| _CleanGetCurrentAndPriorFileWrites | 0.004 | 0.003 | 0.001 | 1 | 1 |
| _GenerateProjectRestoreGraphPerFramework | 0.004 | 0.003 | 0.001 | 1 | 1 |
| CheckForDuplicateItems | 0.005 | 0.006 | 0.001 | 1 | 1 |
| AddPrunePackageReferences | 0.007 | 0.006 | 0.001 | 1 | 1 |
| GenerateGlobalUsings | 0.008 | 0.007 | 0.001 | 1 | 1 |
| SetEmbeddedFilesFromSourceControlManagerUntrackedFiles | 0.018 | 0.017 | 0.001 | 1 | 1 |
| _FilterRestoreGraphProjectInputItems | 0.046 | 0.045 | 0.001 | 1 | 1 |
| AfterBuild | 0.000 | 0.000 | 0.000 | 1 | 1 |
| InitializeSourceControlInformation | 0.000 | 0.000 | 0.000 | 1 | 1 |
| BeforeBuild | 0.000 | 0.000 | 0.000 | 1 | 1 |
| PrepareResourceNames | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResGen | 0.000 | 0.000 | 0.000 | 1 | 1 |
| BeforeCompile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| BeforeResGen | 0.000 | 0.000 | 0.000 | 1 | 1 |
| Compile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolvePackageDependenciesForBuild | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CoreBuild | 0.000 | 0.000 | 0.000 | 1 | 1 |
| PrepareResources | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _InitializeSourceRootMappedPathsFromSourceControl | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _InitializeSourceRootMappedPathsOpt | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _InitializeSourceControlInformationFromSourceControlManager | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AfterResGen | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GenerateSourceLinkFile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CreateCustomManifestResourceNames | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CopySourceItemsToOutputDirectory | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ValidateCommandLineProperties | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CollectRestoreInputs | 0.000 | 0.000 | 0.000 | 1 | 1 |
| SetWin32ManifestProperties | 0.000 | 0.000 | 0.000 | 1 | 1 |
| PrepareProjectReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CreateSatelliteAssemblies | 0.000 | 0.000 | 0.000 | 1 | 1 |
| PrepareForRun | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GenerateAssemblyInfo | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetFrameworkPaths | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GetRestoreSettingsCurrentProject | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetReferenceAssemblyPaths | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AfterResolveReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _SetEmbeddedFilesFromSourceControlManagerUntrackedFiles | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateRestoreGraphProjectEntry | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GenerateMSBuildEditorConfigFile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AfterCompile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetTargetPath | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateRestoreProjectPathItemsCurrentProject | 0.000 | 0.000 | 0.000 | 1 | 1 |
| BeforeResolveReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| Build | 0.000 | 0.000 | 0.000 | 1 | 1 |
| IncludeTransitiveProjectReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _AddOutputPathToGlobalPropertiesToRemove | 0.000 | 0.000 | 0.000 | 1 | 1 |
| BuildOnlySettings | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolveLockFileAnalyzers | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _DefaultMicrosoftNETPlatformLibrary | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _SetSourceLinkFilePath | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ExpandSDKReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForUnsupportedHostingUsage | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _ComputeNETCoreBuildOutputFiles | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _SetTargetFrameworkMonikerAttribute | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CalculateIsVSTestTestProject | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolveSDKReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckAndUnsetUnsupportedPrefer32Bit | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _PopulateCommonStateForGetCopyToOutputDirectoryItems | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateProjectRestoreGraphCurrentProject | 0.000 | 0.000 | 0.000 | 1 | 1 |
| EnableIntermediateOutputPathMismatchWarning | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _BeforeVBCSCoreCompile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _IncludeContentItemsWithOnlyPublishMetadata | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CopyAdditionalFiles | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GetRestoreSettingsOverrides | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForUnsupportedArtifactsPath | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GetRestoreSettingsPerFramework | 0.000 | 0.000 | 0.000 | 1 | 1 |
| IgnoreJavaScriptOutputAssembly | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateRestoreDependencies | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _ComputePackageReferencePublish | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateProjectRestoreGraph | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolveReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AddSourceRevisionToInformationalVersion | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AddImplicitDefineConstants | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForLanguageAndFeatureCombinationSupport | 0.000 | 0.000 | 0.000 | 2 | 2 |
| CollectFrameworkReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _IsProjectRestoreSupported | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForUnsupportedCppNETCoreVersion | 0.000 | 0.000 | 0.000 | 3 | 3 |
| _SplitProjectReferencesByFileExistence | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForObsoleteDotNetCliToolReferences | 0.000 | 0.000 | 0.000 | 2 | 2 |
| _ComputeSkipAnalyzers | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GenerateMSBuildEditorConfigFileShouldRun | 0.000 | 0.000 | 0.000 | 1 | 1 |
| SourceControlManagerPublishTranslatedUrls | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateCompileInputs | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CollectNuGetAuditSuppressions | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckContainersPackage | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolveProjectReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GenerateTargetFrameworkDefineConstants | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForUnsupportedNETCoreVersion | 0.000 | 0.000 | 0.000 | 3 | 3 |
| ResolveLockFileCopyLocalFiles | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetTargetPathWithTargetPlatformMoniker | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateRestoreProjectPathItems | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateSatelliteAssemblyInputs | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetAssemblyAttributes | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CoreResGen | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetAssemblyVersion | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AddGlobalAnalyzerConfigForPackage_MicrosoftCodeAnalysisCSharpCodeStyle | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _ComputeUserRuntimeAssemblies | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateRestoreProjectPathItemsPerFramework | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForInvalidConfigurationAndPlatform | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateRestoreProjectSpec | 0.001 | 0.001 | 0.000 | 1 | 1 |
| SplitResourcesByCulture | 0.001 | 0.001 | 0.000 | 1 | 1 |
| CollectCentralPackageVersions | 0.001 | 0.001 | 0.000 | 1 | 1 |
| InitializeSourceRootMappedPaths | 0.001 | 0.001 | 0.000 | 1 | 1 |
| CollectPackageDownloads | 0.001 | 0.001 | 0.000 | 1 | 1 |
| ResolveLockFileReferences | 0.001 | 0.001 | 0.000 | 1 | 1 |
| AssignTargetPaths | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _GetRestoreTargetFrameworksOutput | 0.001 | 0.001 | 0.000 | 1 | 1 |
| AddGlobalAnalyzerConfigForPackage_MicrosoftCodeAnalysisNetAnalyzers | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _GenerateRestoreProjectPathWalk | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _GetProjectReferenceTargetFrameworkProperties | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _ComputeReferenceAssemblies | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _SourceLinkHasSingleProvider | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _InitializeAzureReposGitSourceLinkUrl | 0.002 | 0.002 | 0.000 | 2 | 2 |
| _InitializeGitLabSourceLinkUrl | 0.002 | 0.002 | 0.000 | 2 | 2 |
| _GenerateSourceLinkFile | 0.002 | 0.002 | 0.000 | 1 | 1 |
| GenerateNETCompatibleDefineConstants | 0.002 | 0.002 | 0.000 | 1 | 1 |
| _GetRestoreProjectStyle | 0.002 | 0.002 | 0.000 | 2 | 2 |
| GenerateTargetFrameworkMonikerAttribute | 0.002 | 0.002 | 0.000 | 1 | 1 |
| IncrementalClean | 0.003 | 0.003 | 0.000 | 1 | 1 |
| _ComputeToolPackInputsToProcessFrameworkReferences | 0.003 | 0.003 | 0.000 | 2 | 2 |
| TranslateGitLabUrlsInSourceControlInformation | 0.003 | 0.003 | 0.000 | 1 | 1 |
| TranslateBitbucketGitUrlsInSourceControlInformation | 0.003 | 0.003 | 0.000 | 1 | 1 |
| TranslateAzureReposGitUrlsInSourceControlInformation | 0.003 | 0.003 | 0.000 | 1 | 1 |
| PrepareForBuild | 0.003 | 0.003 | 0.000 | 1 | 1 |
| CreateGeneratedAssemblyInfoInputsCacheFile | 0.003 | 0.003 | 0.000 | 1 | 1 |
| TranslateGitHubUrlsInSourceControlInformation | 0.003 | 0.003 | 0.000 | 1 | 1 |
| _GetCopyToOutputDirectoryItemsFromThisProject | 0.003 | 0.003 | 0.000 | 1 | 1 |
| ResolveTargetingPackAssets | 0.004 | 0.004 | 0.000 | 1 | 1 |
| _GenerateCompileDependencyCache | 0.005 | 0.005 | 0.000 | 1 | 1 |
| _GetAllRestoreProjectPathItems | 0.006 | 0.006 | 0.000 | 1 | 1 |
| CoreGenerateAssemblyInfo | 0.006 | 0.006 | 0.000 | 1 | 1 |
| _LoadRestoreGraphEntryPoints | 0.007 | 0.007 | 0.000 | 1 | 1 |
| GetCopyToOutputDirectoryItems | 0.010 | 0.010 | 0.000 | 1 | 1 |
| InitializeSourceControlInformationFromSourceControlManager | 0.028 | 0.028 | 0.000 | 1 | 1 |
| _GenerateRestoreGraph | 0.115 | 0.115 | 0.000 | 1 | 1 |

### Shared Slowest Tasks (name-matched)

| Task | GenerateSerializer (s) | Normal (s) | Delta (s) | GenerateSerializer Calls | Normal Calls |
| --- | ---: | ---: | ---: | ---: | ---: |
| Csc | 556.782 | 74.424 | 482.358 | 1 | 1 |
| RestoreTask | 1.994 | 0.213 | 1.781 | 1 | 1 |
| ResolveAssemblyReference | 0.079 | 0.018 | 0.061 | 1 | 1 |
| ResolvePackageAssets | 0.065 | 0.025 | 0.040 | 1 | 1 |
| GenerateMSBuildEditorConfig | 0.001 | 0.035 | 0.034 | 1 | 1 |
| GenerateDepsFile | 0.039 | 0.009 | 0.030 | 1 | 1 |
| Copy | 0.054 | 0.030 | 0.024 | 2 | 2 |
| ResolveAppHosts | 0.009 | 0.002 | 0.007 | 2 | 2 |
| ResolvePackageFileConflicts | 0.008 | 0.003 | 0.005 | 1 | 1 |
| GetRestoreSettingsTask | 0.035 | 0.039 | 0.004 | 1 | 1 |
| ProcessFrameworkReferences | 0.038 | 0.034 | 0.004 | 2 | 2 |
| CheckForDuplicateItems | 0.004 | 0.006 | 0.002 | 3 | 3 |
| AllowEmptyTelemetry | 0.005 | 0.003 | 0.002 | 2 | 2 |
| CopyRefAssembly | 0.015 | 0.013 | 0.002 | 1 | 1 |
| Microsoft.SourceLink.Common.GenerateSourceLinkFile | 0.001 | 0.002 | 0.001 | 1 | 1 |
| GetPackageDirectory | 0.002 | 0.001 | 0.001 | 10 | 10 |
| ResolveTargetingPackAssets | 0.004 | 0.003 | 0.001 | 1 | 1 |
| WriteCodeFragment | 0.005 | 0.006 | 0.001 | 1 | 1 |
| GetPackagesToPrune | 0.007 | 0.006 | 0.001 | 1 | 1 |
| CallTarget | 0.008 | 0.009 | 0.001 | 2 | 2 |
| WriteLinesToFile | 0.011 | 0.010 | 0.001 | 5 | 5 |
| Microsoft.Build.Tasks.Git.GetUntrackedFiles | 0.018 | 0.017 | 0.001 | 1 | 1 |
| MSBuild | 0.151 | 0.150 | 0.001 | 7 | 7 |
| Delete | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetAssemblyVersion | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AssignCulture | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetRestoreNuGetAuditSuppressionsTask | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ReadLinesFromFile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| SetRidAgnosticValueForProjects | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetRestoreFrameworkReferencesTask | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CheckForUnsupportedWinMDReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetRestorePackageDownloadsTask | 0.000 | 0.000 | 0.000 | 1 | 1 |
| FindAppConfigFile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetRestoreDotnetCliToolsTask | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetRestoreProjectReferencesTask | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolveFrameworkReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ValidateExecutableReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetRestorePackageReferencesTask | 0.000 | 0.000 | 0.000 | 1 | 1 |
| Microsoft.SourceLink.Common.SourceLinkHasSingleProvider | 0.000 | 0.000 | 0.000 | 1 | 1 |
| Microsoft.CodeAnalysis.BuildTasks.MapSourceRoots | 0.000 | 0.000 | 0.000 | 1 | 1 |
| JoinItems | 0.000 | 0.000 | 0.000 | 1 | 1 |
| NuGetMessageTask | 0.001 | 0.001 | 0.000 | 1 | 1 |
| GetProjectTargetFrameworksTask | 0.001 | 0.001 | 0.000 | 1 | 1 |
| CheckForDuplicateFrameworkReferences | 0.001 | 0.001 | 0.000 | 2 | 2 |
| AssignTargetPath | 0.001 | 0.001 | 0.000 | 6 | 6 |
| Message | 0.001 | 0.001 | 0.000 | 6 | 6 |
| ConvertToAbsolutePath | 0.001 | 0.001 | 0.000 | 3 | 3 |
| FindUnderPath | 0.001 | 0.001 | 0.000 | 5 | 5 |
| GetRestorePrunePackageReferencesTask | 0.001 | 0.001 | 0.000 | 1 | 1 |
| CheckForImplicitPackageReferenceOverrides | 0.001 | 0.001 | 0.000 | 2 | 2 |
| WarnForInvalidProjectsTask | 0.001 | 0.001 | 0.000 | 1 | 1 |
| Microsoft.SourceLink.AzureRepos.Git.GetSourceLinkUrl | 0.001 | 0.001 | 0.000 | 2 | 2 |
| Microsoft.SourceLink.Bitbucket.Git.GetSourceLinkUrl | 0.001 | 0.001 | 0.000 | 2 | 2 |
| Microsoft.SourceLink.GitLab.GetSourceLinkUrl | 0.001 | 0.001 | 0.000 | 2 | 2 |
| Microsoft.SourceLink.GitHub.GetSourceLinkUrl | 0.001 | 0.001 | 0.000 | 2 | 2 |
| GetRestoreProjectStyleTask | 0.002 | 0.002 | 0.000 | 2 | 2 |
| Microsoft.SourceLink.GitLab.TranslateRepositoryUrls | 0.002 | 0.002 | 0.000 | 1 | 1 |
| Microsoft.SourceLink.Bitbucket.Git.TranslateRepositoryUrls | 0.002 | 0.002 | 0.000 | 1 | 1 |
| Microsoft.SourceLink.AzureRepos.Git.TranslateRepositoryUrls | 0.002 | 0.002 | 0.000 | 1 | 1 |
| Hash | 0.002 | 0.002 | 0.000 | 2 | 2 |
| GetFrameworkPath | 0.002 | 0.002 | 0.000 | 1 | 1 |
| Microsoft.SourceLink.GitHub.TranslateRepositoryUrls | 0.002 | 0.002 | 0.000 | 1 | 1 |
| MakeDir | 0.002 | 0.002 | 0.000 | 1 | 1 |
| RemoveDuplicates | 0.003 | 0.003 | 0.000 | 7 | 7 |
| CheckForDuplicateNuGetItemsTask | 0.003 | 0.003 | 0.000 | 6 | 6 |
| GenerateGlobalUsings | 0.005 | 0.005 | 0.000 | 1 | 1 |
| Microsoft.Build.Tasks.Git.LocateRepository | 0.027 | 0.027 | 0.000 | 1 | 1 |
