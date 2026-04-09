# Benchmark Report

## Run Metadata

| Key | Value |
| --- | --- |
| Started (UTC) | 2026-04-09T08:39:26.486Z |
| Finished (UTC) | 2026-04-09T08:50:28.947Z |
| Status | success |
| Total Duration (s) | 662.460 |
| Report Path | benchmark-report.md |

## Command Timing Summary

| Step | Command | Exit Code | Duration (s) | Status |
| --- | --- | ---: | ---: | --- |
| Code generation | node .\codegen.js --count 3000 --min-props 100 --max-props 200 --seed orleans-codegen-benchmark | 0 | 2.463 | success |
| GenerateSerializer build | dotnet build .\src\Orleans.CodeGen.Benchmark.GenerateSerializer\Orleans.CodeGen.Benchmark.GenerateSerializer.csproj -c Release | 0 | 583.144 | success |
| Normal build | dotnet build .\src\Orleans.CodeGen.Benchmark.Normal\Orleans.CodeGen.Benchmark.Normal.csproj -c Release | 0 | 76.852 | success |

## Compile Detail Breakdown

### GenerateSerializer

| Metric | Value |
| --- | --- |
| Build Duration (s) | 583.144 |
| Exit Code | 0 |
| Warnings (log match count) | 1 |
| Errors (log match count) | 1 |
| Performance Summary Parsed | Yes |
| Binlog | .\\benchmark-artifacts\\GenerateSerializer.binlog |

#### Slowest Targets

| Target | Time (s) | Calls |
| --- | ---: | ---: |
| CoreCompile | 581.581 | 1 |
| Restore | 0.185 | 1 |
| _GenerateRestoreGraph | 0.159 | 1 |
| CopyFilesToOutputDirectory | 0.115 | 1 |
| _GetRestoreSettings | 0.085 | 1 |
| _FilterRestoreGraphProjectInputItems | 0.046 | 1 |
| ProcessFrameworkReferences | 0.043 | 2 |
| ResolvePackageAssets | 0.036 | 1 |
| InitializeSourceControlInformationFromSourceControlManager | 0.026 | 1 |
| CreateGeneratedAssemblyInfoInputsCacheFile | 0.023 | 1 |
| ResolveAssemblyReferences | 0.020 | 1 |
| GenerateGlobalUsings | 0.020 | 1 |
| SetEmbeddedFilesFromSourceControlManagerUntrackedFiles | 0.014 | 1 |
| _HandlePackageFileConflicts | 0.012 | 1 |
| AddPrunePackageReferences | 0.010 | 1 |
| GetCopyToOutputDirectoryItems | 0.008 | 1 |
| _LoadRestoreGraphEntryPoints | 0.007 | 1 |
| FindReferenceAssembliesForReferences | 0.007 | 1 |
| TranslateBitbucketGitUrlsInSourceControlInformation | 0.006 | 1 |
| CoreGenerateAssemblyInfo | 0.006 | 1 |

#### Slowest Tasks

| Task | Time (s) | Calls |
| --- | ---: | ---: |
| Csc | 581.578 | 1 |
| MSBuild | 0.195 | 7 |
| RestoreTask | 0.184 | 1 |
| Copy | 0.091 | 2 |
| GetRestoreSettingsTask | 0.085 | 1 |
| WriteLinesToFile | 0.038 | 3 |
| ProcessFrameworkReferences | 0.038 | 2 |
| ResolvePackageAssets | 0.036 | 1 |
| Microsoft.Build.Tasks.Git.LocateRepository | 0.025 | 1 |
| CopyRefAssembly | 0.023 | 1 |
| ResolveAssemblyReference | 0.019 | 1 |
| Microsoft.Build.Tasks.Git.GetUntrackedFiles | 0.014 | 1 |
| GetPackagesToPrune | 0.009 | 1 |
| CallTarget | 0.007 | 2 |
| GenerateGlobalUsings | 0.005 | 1 |
| WriteCodeFragment | 0.005 | 1 |
| ResolveTargetingPackAssets | 0.004 | 1 |
| Microsoft.SourceLink.GitHub.GetSourceLinkUrl | 0.004 | 2 |
| Microsoft.SourceLink.GitHub.TranslateRepositoryUrls | 0.003 | 1 |
| RemoveDuplicates | 0.003 | 7 |

### Normal

| Metric | Value |
| --- | --- |
| Build Duration (s) | 76.852 |
| Exit Code | 0 |
| Warnings (log match count) | 1 |
| Errors (log match count) | 1 |
| Performance Summary Parsed | Yes |
| Binlog | .\\benchmark-artifacts\\Normal.binlog |

#### Slowest Targets

| Target | Time (s) | Calls |
| --- | ---: | ---: |
| CoreCompile | 75.563 | 1 |
| Restore | 0.131 | 1 |
| _GenerateRestoreGraph | 0.110 | 1 |
| CopyFilesToOutputDirectory | 0.066 | 1 |
| _FilterRestoreGraphProjectInputItems | 0.046 | 1 |
| ProcessFrameworkReferences | 0.038 | 2 |
| _GetRestoreSettings | 0.035 | 1 |
| InitializeSourceControlInformationFromSourceControlManager | 0.026 | 1 |
| SetEmbeddedFilesFromSourceControlManagerUntrackedFiles | 0.018 | 1 |
| FindReferenceAssembliesForReferences | 0.015 | 1 |
| ResolveAssemblyReferences | 0.012 | 1 |
| _GenerateSourceLinkFile | 0.012 | 1 |
| GetCopyToOutputDirectoryItems | 0.008 | 1 |
| _LoadRestoreGraphEntryPoints | 0.007 | 1 |
| CoreGenerateAssemblyInfo | 0.006 | 1 |
| AddPrunePackageReferences | 0.006 | 1 |
| _GetAllRestoreProjectPathItems | 0.006 | 1 |
| GenerateGlobalUsings | 0.006 | 1 |
| CheckForDuplicateItems | 0.006 | 1 |
| _HandlePackageFileConflicts | 0.005 | 1 |

#### Slowest Tasks

| Task | Time (s) | Calls |
| --- | ---: | ---: |
| Csc | 75.560 | 1 |
| MSBuild | 0.145 | 7 |
| RestoreTask | 0.131 | 1 |
| Copy | 0.040 | 2 |
| GetRestoreSettingsTask | 0.035 | 1 |
| ProcessFrameworkReferences | 0.034 | 2 |
| Microsoft.Build.Tasks.Git.LocateRepository | 0.025 | 1 |
| CopyRefAssembly | 0.018 | 1 |
| Microsoft.Build.Tasks.Git.GetUntrackedFiles | 0.018 | 1 |
| Microsoft.SourceLink.Common.GenerateSourceLinkFile | 0.012 | 1 |
| ResolveAssemblyReference | 0.011 | 1 |
| CallTarget | 0.007 | 2 |
| GetPackagesToPrune | 0.006 | 1 |
| CheckForDuplicateItems | 0.006 | 3 |
| Microsoft.SourceLink.GitHub.GetSourceLinkUrl | 0.005 | 2 |
| GenerateGlobalUsings | 0.005 | 1 |
| WriteCodeFragment | 0.005 | 1 |
| ResolveTargetingPackAssets | 0.004 | 1 |
| ResolvePackageFileConflicts | 0.004 | 1 |
| CheckForDuplicateNuGetItemsTask | 0.003 | 6 |

## Build Mode Comparison

### Summary

| Metric | GenerateSerializer | Normal | Delta |
| --- | ---: | ---: | ---: |
| Build Duration (s) | 583.144 | 76.852 | 506.292 |
| Warnings | 1 | 1 | 0 |
| Errors | 1 | 1 | 0 |

### Shared Slowest Targets (name-matched)

| Target | GenerateSerializer (s) | Normal (s) | Delta (s) | GenerateSerializer Calls | Normal Calls |
| --- | ---: | ---: | ---: | ---: | ---: |
| CoreCompile | 581.581 | 75.563 | 506.018 | 1 | 1 |
| Restore | 0.185 | 0.131 | 0.054 | 1 | 1 |
| _GetRestoreSettings | 0.085 | 0.035 | 0.050 | 1 | 1 |
| CopyFilesToOutputDirectory | 0.115 | 0.066 | 0.049 | 1 | 1 |
| _GenerateRestoreGraph | 0.159 | 0.110 | 0.049 | 1 | 1 |
| ResolvePackageAssets | 0.036 | 0.001 | 0.035 | 1 | 1 |
| CreateGeneratedAssemblyInfoInputsCacheFile | 0.023 | 0.003 | 0.020 | 1 | 1 |
| GenerateGlobalUsings | 0.020 | 0.006 | 0.014 | 1 | 1 |
| _GenerateSourceLinkFile | 0.002 | 0.012 | 0.010 | 1 | 1 |
| FindReferenceAssembliesForReferences | 0.007 | 0.015 | 0.008 | 1 | 1 |
| ResolveAssemblyReferences | 0.020 | 0.012 | 0.008 | 1 | 1 |
| _HandlePackageFileConflicts | 0.012 | 0.005 | 0.007 | 1 | 1 |
| ProcessFrameworkReferences | 0.043 | 0.038 | 0.005 | 2 | 2 |
| CheckForDuplicateItems | 0.002 | 0.006 | 0.004 | 1 | 1 |
| AddPrunePackageReferences | 0.010 | 0.006 | 0.004 | 1 | 1 |
| SetEmbeddedFilesFromSourceControlManagerUntrackedFiles | 0.014 | 0.018 | 0.004 | 1 | 1 |
| TranslateBitbucketGitUrlsInSourceControlInformation | 0.006 | 0.003 | 0.003 | 1 | 1 |
| _ComputeToolPackInputsToProcessFrameworkReferences | 0.006 | 0.003 | 0.003 | 2 | 2 |
| CheckForImplicitPackageReferenceOverrides | 0.001 | 0.003 | 0.002 | 2 | 2 |
| GenerateTargetFrameworkMonikerAttribute | 0.000 | 0.001 | 0.001 | 1 | 1 |
| CollectPrunePackageReferences | 0.001 | 0.000 | 0.001 | 1 | 1 |
| _GenerateRestoreSpecs | 0.001 | 0.000 | 0.001 | 1 | 1 |
| GenerateNETCompatibleDefineConstants | 0.002 | 0.001 | 0.001 | 1 | 1 |
| _GenerateDotnetCliToolReferenceSpecs | 0.002 | 0.001 | 0.001 | 1 | 1 |
| _GetRestoreProjectStyle | 0.003 | 0.002 | 0.001 | 2 | 2 |
| TranslateGitHubUrlsInSourceControlInformation | 0.004 | 0.003 | 0.001 | 1 | 1 |
| GenerateMSBuildEditorConfigFileCore | 0.004 | 0.003 | 0.001 | 1 | 1 |
| _GenerateProjectRestoreGraphPerFramework | 0.004 | 0.003 | 0.001 | 1 | 1 |
| PrepareResourceNames | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResGen | 0.000 | 0.000 | 0.000 | 1 | 1 |
| BeforeCompile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| BeforeBuild | 0.000 | 0.000 | 0.000 | 1 | 1 |
| InitializeSourceControlInformation | 0.000 | 0.000 | 0.000 | 1 | 1 |
| BeforeResGen | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolvePackageDependenciesForBuild | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AfterBuild | 0.000 | 0.000 | 0.000 | 1 | 1 |
| PrepareResources | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _InitializeSourceRootMappedPathsFromSourceControl | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _InitializeSourceControlInformationFromSourceControlManager | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _InitializeSourceRootMappedPathsOpt | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AfterResGen | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ValidateCommandLineProperties | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GenerateSourceLinkFile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GenerateAssemblyInfo | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CreateCustomManifestResourceNames | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CollectRestoreInputs | 0.000 | 0.000 | 0.000 | 1 | 1 |
| SetWin32ManifestProperties | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GenerateMSBuildEditorConfigFile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CoreBuild | 0.000 | 0.000 | 0.000 | 1 | 1 |
| PrepareProjectReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _SetEmbeddedFilesFromSourceControlManagerUntrackedFiles | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetReferenceAssemblyPaths | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateRestoreProjectPathItemsCurrentProject | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GetRestoreSettingsCurrentProject | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetFrameworkPaths | 0.000 | 0.000 | 0.000 | 1 | 1 |
| BeforeResolveReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CopySourceItemsToOutputDirectory | 0.000 | 0.000 | 0.000 | 1 | 1 |
| Compile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CreateSatelliteAssemblies | 0.000 | 0.000 | 0.000 | 1 | 1 |
| PrepareForRun | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AfterResolveReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _AddOutputPathToGlobalPropertiesToRemove | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AfterCompile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForUnsupportedHostingUsage | 0.000 | 0.000 | 0.000 | 1 | 1 |
| IncludeTransitiveProjectReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetTargetPath | 0.000 | 0.000 | 0.000 | 1 | 1 |
| EnableIntermediateOutputPathMismatchWarning | 0.000 | 0.000 | 0.000 | 1 | 1 |
| Build | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateRestoreGraphProjectEntry | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForUnsupportedArtifactsPath | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolveLockFileAnalyzers | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckAndUnsetUnsupportedPrefer32Bit | 0.000 | 0.000 | 0.000 | 1 | 1 |
| BuildOnlySettings | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _SetSourceLinkFilePath | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _DefaultMicrosoftNETPlatformLibrary | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolveSDKReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _SetTargetFrameworkMonikerAttribute | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ExpandSDKReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _BeforeVBCSCoreCompile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CalculateIsVSTestTestProject | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _ComputeNETCoreBuildOutputFiles | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GetRestoreTargetFrameworkOverride | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _PopulateCommonStateForGetCopyToOutputDirectoryItems | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AddSourceRevisionToInformationalVersion | 0.000 | 0.000 | 0.000 | 1 | 1 |
| IgnoreJavaScriptOutputAssembly | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CopyAdditionalFiles | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AddImplicitDefineConstants | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _IncludeContentItemsWithOnlyPublishMetadata | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _ComputePackageReferencePublish | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolveReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForLanguageAndFeatureCombinationSupport | 0.000 | 0.000 | 0.000 | 2 | 2 |
| _SplitProjectReferencesByFileExistence | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _IsProjectRestoreSupported | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GetRestoreSettingsOverrides | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateProjectRestoreGraphCurrentProject | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForObsoleteDotNetCliToolReferences | 0.000 | 0.000 | 0.000 | 2 | 2 |
| _ComputeSkipAnalyzers | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateRestoreDependencies | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateProjectRestoreGraph | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GenerateMSBuildEditorConfigFileShouldRun | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForUnsupportedCppNETCoreVersion | 0.000 | 0.000 | 0.000 | 3 | 3 |
| SourceControlManagerPublishTranslatedUrls | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GetRestoreSettingsPerFramework | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateCompileInputs | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CollectFrameworkReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CoreResGen | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolveProjectReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolveLockFileCopyLocalFiles | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetTargetPathWithTargetPlatformMoniker | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForUnsupportedNETCoreVersion | 0.000 | 0.000 | 0.000 | 3 | 3 |
| GetAssemblyAttributes | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CollectNuGetAuditSuppressions | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateRestoreProjectPathItems | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AddGlobalAnalyzerConfigForPackage_MicrosoftCodeAnalysisCSharpCodeStyle | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateSatelliteAssemblyInputs | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckContainersPackage | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetAssemblyVersion | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GenerateTargetFrameworkDefineConstants | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForCompileOutputs | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _CheckForInvalidConfigurationAndPlatform | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _ComputeUserRuntimeAssemblies | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _BlockWinMDsOnUnsupportedTFMs | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ValidateExecutableReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| _GenerateRestoreProjectPathItemsPerFramework | 0.000 | 0.000 | 0.000 | 1 | 1 |
| SplitResourcesByCulture | 0.001 | 0.001 | 0.000 | 1 | 1 |
| InitializeSourceRootMappedPaths | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _GenerateRestoreProjectSpec | 0.001 | 0.001 | 0.000 | 1 | 1 |
| GenerateBuildDependencyFile | 0.001 | 0.001 | 0.000 | 1 | 1 |
| CollectCentralPackageVersions | 0.001 | 0.001 | 0.000 | 1 | 1 |
| ResolveLockFileReferences | 0.001 | 0.001 | 0.000 | 1 | 1 |
| AssignTargetPaths | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _GetProjectReferenceTargetFrameworkProperties | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _ComputeReferenceAssemblies | 0.001 | 0.001 | 0.000 | 1 | 1 |
| IncrementalClean | 0.001 | 0.001 | 0.000 | 1 | 1 |
| CollectPackageDownloads | 0.001 | 0.001 | 0.000 | 1 | 1 |
| AddGlobalAnalyzerConfigForPackage_MicrosoftCodeAnalysisNetAnalyzers | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _GenerateRestoreProjectPathWalk | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _SourceLinkHasSingleProvider | 0.001 | 0.001 | 0.000 | 1 | 1 |
| _GetRestoreTargetFrameworksOutput | 0.001 | 0.001 | 0.000 | 1 | 1 |
| CollectPackageReferences | 0.001 | 0.001 | 0.000 | 2 | 2 |
| _InitializeBitbucketGitSourceLinkUrl | 0.002 | 0.002 | 0.000 | 2 | 2 |
| _InitializeAzureReposGitSourceLinkUrl | 0.002 | 0.002 | 0.000 | 2 | 2 |
| PrepareForBuild | 0.002 | 0.002 | 0.000 | 1 | 1 |
| _InitializeGitLabSourceLinkUrl | 0.002 | 0.002 | 0.000 | 2 | 2 |
| _SetEmbeddedWin32ManifestProperties | 0.002 | 0.002 | 0.000 | 1 | 1 |
| ResolveOffByDefaultAnalyzers | 0.003 | 0.003 | 0.000 | 1 | 1 |
| _GetCopyToOutputDirectoryItemsFromThisProject | 0.003 | 0.003 | 0.000 | 1 | 1 |
| TranslateAzureReposGitUrlsInSourceControlInformation | 0.003 | 0.003 | 0.000 | 1 | 1 |
| _GenerateCompileDependencyCache | 0.003 | 0.003 | 0.000 | 1 | 1 |
| _GetCopyToOutputDirectoryItemsFromTransitiveProjectReferences | 0.003 | 0.003 | 0.000 | 1 | 1 |
| TranslateGitLabUrlsInSourceControlInformation | 0.003 | 0.003 | 0.000 | 1 | 1 |
| ResolveFrameworkReferences | 0.003 | 0.003 | 0.000 | 1 | 1 |
| _CleanGetCurrentAndPriorFileWrites | 0.003 | 0.003 | 0.000 | 1 | 1 |
| _CollectTargetFrameworkForTelemetry | 0.004 | 0.004 | 0.000 | 2 | 2 |
| ResolveTargetingPackAssets | 0.004 | 0.004 | 0.000 | 1 | 1 |
| _InitializeGitHubSourceLinkUrl | 0.005 | 0.005 | 0.000 | 2 | 2 |
| CoreGenerateAssemblyInfo | 0.006 | 0.006 | 0.000 | 1 | 1 |
| _GetAllRestoreProjectPathItems | 0.006 | 0.006 | 0.000 | 1 | 1 |
| _LoadRestoreGraphEntryPoints | 0.007 | 0.007 | 0.000 | 1 | 1 |
| GetCopyToOutputDirectoryItems | 0.008 | 0.008 | 0.000 | 1 | 1 |
| InitializeSourceControlInformationFromSourceControlManager | 0.026 | 0.026 | 0.000 | 1 | 1 |
| _FilterRestoreGraphProjectInputItems | 0.046 | 0.046 | 0.000 | 1 | 1 |

### Shared Slowest Tasks (name-matched)

| Task | GenerateSerializer (s) | Normal (s) | Delta (s) | GenerateSerializer Calls | Normal Calls |
| --- | ---: | ---: | ---: | ---: | ---: |
| Csc | 581.578 | 75.560 | 506.018 | 1 | 1 |
| RestoreTask | 0.184 | 0.131 | 0.053 | 1 | 1 |
| Copy | 0.091 | 0.040 | 0.051 | 2 | 2 |
| GetRestoreSettingsTask | 0.085 | 0.035 | 0.050 | 1 | 1 |
| MSBuild | 0.195 | 0.145 | 0.050 | 7 | 7 |
| ResolvePackageAssets | 0.036 | 0.001 | 0.035 | 1 | 1 |
| WriteLinesToFile | 0.038 | 0.003 | 0.035 | 3 | 3 |
| Microsoft.SourceLink.Common.GenerateSourceLinkFile | 0.002 | 0.012 | 0.010 | 1 | 1 |
| ResolveAssemblyReference | 0.019 | 0.011 | 0.008 | 1 | 1 |
| CopyRefAssembly | 0.023 | 0.018 | 0.005 | 1 | 1 |
| CheckForDuplicateItems | 0.002 | 0.006 | 0.004 | 3 | 3 |
| Microsoft.Build.Tasks.Git.GetUntrackedFiles | 0.014 | 0.018 | 0.004 | 1 | 1 |
| ProcessFrameworkReferences | 0.038 | 0.034 | 0.004 | 2 | 2 |
| GetPackagesToPrune | 0.009 | 0.006 | 0.003 | 1 | 1 |
| AllowEmptyTelemetry | 0.001 | 0.003 | 0.002 | 2 | 2 |
| Microsoft.CodeAnalysis.BuildTasks.MapSourceRoots | 0.000 | 0.001 | 0.001 | 1 | 1 |
| GetRestoreDotnetCliToolsTask | 0.001 | 0.000 | 0.001 | 1 | 1 |
| Microsoft.SourceLink.GitLab.GetSourceLinkUrl | 0.002 | 0.001 | 0.001 | 2 | 2 |
| GetRestoreProjectStyleTask | 0.002 | 0.001 | 0.001 | 2 | 2 |
| Microsoft.SourceLink.GitHub.TranslateRepositoryUrls | 0.003 | 0.002 | 0.001 | 1 | 1 |
| ResolvePackageFileConflicts | 0.003 | 0.004 | 0.001 | 1 | 1 |
| Microsoft.SourceLink.GitHub.GetSourceLinkUrl | 0.004 | 0.005 | 0.001 | 2 | 2 |
| GetAssemblyVersion | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetRestoreNuGetAuditSuppressionsTask | 0.000 | 0.000 | 0.000 | 1 | 1 |
| AssignCulture | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetRestorePackageDownloadsTask | 0.000 | 0.000 | 0.000 | 1 | 1 |
| SetRidAgnosticValueForProjects | 0.000 | 0.000 | 0.000 | 1 | 1 |
| Delete | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetRestoreFrameworkReferencesTask | 0.000 | 0.000 | 0.000 | 1 | 1 |
| CheckForUnsupportedWinMDReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| FindAppConfigFile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ResolveFrameworkReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetRestoreProjectReferencesTask | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ValidateExecutableReferences | 0.000 | 0.000 | 0.000 | 1 | 1 |
| ReadLinesFromFile | 0.000 | 0.000 | 0.000 | 1 | 1 |
| Microsoft.SourceLink.Common.SourceLinkHasSingleProvider | 0.000 | 0.000 | 0.000 | 1 | 1 |
| JoinItems | 0.000 | 0.000 | 0.000 | 1 | 1 |
| GetRestorePackageReferencesTask | 0.000 | 0.000 | 0.000 | 1 | 1 |
| NuGetMessageTask | 0.001 | 0.001 | 0.000 | 1 | 1 |
| CheckForDuplicateFrameworkReferences | 0.001 | 0.001 | 0.000 | 2 | 2 |
| AssignTargetPath | 0.001 | 0.001 | 0.000 | 6 | 6 |
| GetProjectTargetFrameworksTask | 0.001 | 0.001 | 0.000 | 1 | 1 |
| CheckForImplicitPackageReferenceOverrides | 0.001 | 0.001 | 0.000 | 2 | 2 |
| ConvertToAbsolutePath | 0.001 | 0.001 | 0.000 | 3 | 3 |
| MakeDir | 0.001 | 0.001 | 0.000 | 1 | 1 |
| Message | 0.001 | 0.001 | 0.000 | 6 | 6 |
| GenerateMSBuildEditorConfig | 0.001 | 0.001 | 0.000 | 1 | 1 |
| FindUnderPath | 0.001 | 0.001 | 0.000 | 5 | 5 |
| WarnForInvalidProjectsTask | 0.001 | 0.001 | 0.000 | 1 | 1 |
| GetRestorePrunePackageReferencesTask | 0.001 | 0.001 | 0.000 | 1 | 1 |
| Microsoft.SourceLink.Bitbucket.Git.GetSourceLinkUrl | 0.001 | 0.001 | 0.000 | 2 | 2 |
| Microsoft.SourceLink.AzureRepos.Git.GetSourceLinkUrl | 0.001 | 0.001 | 0.000 | 2 | 2 |
| Hash | 0.001 | 0.001 | 0.000 | 2 | 2 |
| GetFrameworkPath | 0.002 | 0.002 | 0.000 | 1 | 1 |
| Microsoft.SourceLink.AzureRepos.Git.TranslateRepositoryUrls | 0.002 | 0.002 | 0.000 | 1 | 1 |
| Microsoft.SourceLink.GitLab.TranslateRepositoryUrls | 0.002 | 0.002 | 0.000 | 1 | 1 |
| Microsoft.SourceLink.Bitbucket.Git.TranslateRepositoryUrls | 0.002 | 0.002 | 0.000 | 1 | 1 |
| ResolveAppHosts | 0.002 | 0.002 | 0.000 | 2 | 2 |
| GetPackageDirectory | 0.002 | 0.002 | 0.000 | 10 | 10 |
| RemoveDuplicates | 0.003 | 0.003 | 0.000 | 7 | 7 |
| CheckForDuplicateNuGetItemsTask | 0.003 | 0.003 | 0.000 | 6 | 6 |
| ResolveTargetingPackAssets | 0.004 | 0.004 | 0.000 | 1 | 1 |
| GenerateGlobalUsings | 0.005 | 0.005 | 0.000 | 1 | 1 |
| WriteCodeFragment | 0.005 | 0.005 | 0.000 | 1 | 1 |
| CallTarget | 0.007 | 0.007 | 0.000 | 2 | 2 |
| Microsoft.Build.Tasks.Git.LocateRepository | 0.025 | 0.025 | 0.000 | 1 | 1 |
