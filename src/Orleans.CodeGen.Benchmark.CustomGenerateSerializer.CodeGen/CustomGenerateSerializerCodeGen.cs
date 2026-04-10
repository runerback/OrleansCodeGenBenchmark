using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Immutable;
using System.Text;
using static Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Orleans.CodeGen.Benchmark.CustomGenerateSerializer.CodeGen;

[Generator]
internal sealed class CustomGenerateSerializerCodeGen : IIncrementalGenerator
{
    private const string CustomGenerateSerializerAttributeName = "Orleans.CodeGen.Benchmark.CustomGenerateSerializer.CustomAttributes.CustomGenerateSerializerAttribute";

    public void Initialize(IncrementalGeneratorInitializationContext context)
    {
        var compilations = context.SyntaxProvider
            .ForAttributeWithMetadataName(CustomGenerateSerializerAttributeName,
                predicate: static (node, _) => node is ClassDeclarationSyntax || node is RecordDeclarationSyntax,
                transform: static (context, _) => new CustomOrleansSerializerCodeGenModel(
                    (INamedTypeSymbol)context.TargetSymbol,
                    (TypeDeclarationSyntax)context.TargetNode))
            .Collect();
        context.RegisterSourceOutput(compilations,
            static (context, source) => Execute(source, context));
    }

    private static void Execute(ImmutableArray<CustomOrleansSerializerCodeGenModel> source, SourceProductionContext context)
    {
        if (source.Length > 0)
        {
            foreach (var group in source.GroupBy(it => it.NamespaceName))
            {
                var namespaceName = ParseName(group.Key);
                var copiers = new List<string>();
                var activators = new List<string>();
                var codecs = new List<string>();
                foreach (var model in group)
                {
                    TypeSyntax sourceSymbolName;
                    IReadOnlyCollection<TypeParameterSyntax> typeParams = [];
                    if (model.Syntax.TypeParameterList is { } typeParamList)
                    {
                        typeParams = [.. typeParamList.Parameters];
                    }
                    if (model.Symbol.TypeParameters.Length > 0)
                    {
                        sourceSymbolName = GenericName(model.Symbol.Name).AddTypeArgumentListArguments(
                            [.. model.Symbol.TypeParameters.Select(it => IdentifierName(it.Name))]);
                    }
                    else
                    {
                        sourceSymbolName = IdentifierName(model.Symbol.Name);
                    }
                    var genericTypeSuffix = typeParams.Count > 0
                        ? new string(['<', .. (typeParams.Count > 1 ? Enumerable.Repeat(',', typeParams.Count - 1) : []), '>'])
                        : string.Empty;
                    var copierName = string.Join("_", "Copier", model.Symbol.Name);
                    var copier = ClassDeclaration(copierName)
                        .AddModifiers(Token(SyntaxKind.PublicKeyword), Token(SyntaxKind.SealedKeyword))
                        .AddConstraintClauses([.. model.Syntax.ConstraintClauses])
                        .AddBaseListTypes(SimpleBaseType(GenericName("SimpleOrleansCopier").AddTypeArgumentListArguments(sourceSymbolName)))
                        .AddAttributeLists(AttributeList().AddAttributes(Attribute(IdentifierName("EditorBrowsable"))
                        .AddArgumentListArguments(AttributeArgument(MemberAccessExpression(SyntaxKind.SimpleMemberAccessExpression,
                            IdentifierName("EditorBrowsableState"),
                            IdentifierName("Never"))))))
                        .WithMembers([]);
                    if (typeParams.Count > 0)
                    {
                        copier = copier.AddTypeParameterListParameters([.. typeParams]);
                    }
                    copiers.Add(copierName + genericTypeSuffix);

                    var activatorName = string.Join("_", "Activator", model.Symbol.Name);
                    var activator = ClassDeclaration(activatorName)
                        .AddModifiers(Token(SyntaxKind.InternalKeyword), Token(SyntaxKind.SealedKeyword))
                        .AddConstraintClauses([.. model.Syntax.ConstraintClauses])
                        .AddBaseListTypes(SimpleBaseType(GenericName("SimpleOrleansActivator").AddTypeArgumentListArguments(sourceSymbolName)))
                        .AddAttributeLists(AttributeList().AddAttributes(Attribute(IdentifierName("EditorBrowsable"))
                        .AddArgumentListArguments(AttributeArgument(MemberAccessExpression(SyntaxKind.SimpleMemberAccessExpression,
                            IdentifierName("EditorBrowsableState"),
                            IdentifierName("Never"))))))
                        .WithMembers([]);
                    if (typeParams.Count > 0)
                    {
                        activator = activator.AddTypeParameterListParameters([.. typeParams]);
                    }
                    activators.Add(activatorName + genericTypeSuffix);

                    var codecName = string.Join("_", "Codec", model.Symbol.Name);
                    var codec = ClassDeclaration(codecName)
                        .AddModifiers(Token(SyntaxKind.PublicKeyword), Token(SyntaxKind.SealedKeyword))
                        .AddConstraintClauses([.. model.Syntax.ConstraintClauses])
                        .AddParameterListParameters(Parameter(Identifier("codecProvider")).WithType(IdentifierName("ICodecProvider")))
                        .AddBaseListTypes(PrimaryConstructorBaseType(GenericName("SimpleOrleansJsonCodec")
                        .AddTypeArgumentListArguments(sourceSymbolName))
                        .AddArgumentListArguments(Argument(IdentifierName("codecProvider"))))
                        .AddAttributeLists(AttributeList().AddAttributes(Attribute(IdentifierName("EditorBrowsable"))
                        .AddArgumentListArguments(AttributeArgument(MemberAccessExpression(SyntaxKind.SimpleMemberAccessExpression,
                            IdentifierName("EditorBrowsableState"),
                            IdentifierName("Never"))))))
                        .WithMembers([]);
                    if (typeParams.Count > 0)
                    {
                        codec = codec.AddTypeParameterListParameters([.. typeParams]);
                    }
                    codecs.Add(codecName + genericTypeSuffix);

                    var serializerSource = CompilationUnit()
                        .AddUsings([.. new string[]
                        {
                            model.Symbol.ContainingNamespace.ToDisplayString(),
                            "Orleans.CodeGen.Benchmark.CustomGenerateSerializer.CustomSerializers",
                            "Orleans",
                            "Orleans.Serialization.Codecs",
                            "Orleans.Serialization.Serializers",
                            "Orleans.Serialization.Activators",
                            "Orleans.Serialization.Cloning",
                            "System.ComponentModel",
                        }.Distinct().OrderBy(it => it).Select(it => UsingDirective(ParseName(it)))])
                        .AddMembers(FileScopedNamespaceDeclaration(namespaceName)
                        .AddMembers(copier, activator, codec))
                        .WithLeadingTrivia(TriviaList(
                            Trivia(NullableDirectiveTrivia(Token(SyntaxKind.EnableKeyword), isActive: true))))
                        .NormalizeWhitespace();
                    context.AddSource($"CustomOrleansCodeGen_{model.Symbol.Name}.g.cs", serializerSource.GetText(Encoding.UTF8));
                }
                var metadataName = string.Join("_", "CustomMetadata", group.Key.Substring(16).Replace(".", ""));
                static StatementSyntax MetadataRegisterStatement(string kind, string type)
                {
                    // config.{kind}.Add(typeof({type}));
                    return ExpressionStatement(InvocationExpression(MemberAccessExpression(SyntaxKind.SimpleMemberAccessExpression,
                        MemberAccessExpression(SyntaxKind.SimpleMemberAccessExpression, IdentifierName("config"), IdentifierName(kind)),
                        IdentifierName("Add")))
                        .AddArgumentListArguments(Argument(TypeOfExpression(IdentifierName(type)))));
                }
                var registerStates = Enumerable.Empty<StatementSyntax>()
                    .Concat(codecs.Select(it => MetadataRegisterStatement("Serializers", it)))
                    .Concat(copiers.Select(it => MetadataRegisterStatement("Copiers", it)))
                    .Concat(activators.Select(it => MetadataRegisterStatement("Activators", it)))
                    .ToArray();
                if (registerStates.Length > 0)
                {
                    var registerSource = CompilationUnit().AddUsings(
                        UsingDirective(ParseName("Orleans.Serialization.Configuration")),
                        UsingDirective(ParseName("System.ComponentModel")))
                        .WithAttributeLists(List([AttributeList(AttributeTargetSpecifier(Token(SyntaxKind.AssemblyKeyword)),
                            SeparatedList([Attribute(IdentifierName("TypeManifestProvider"))
                        .AddArgumentListArguments(AttributeArgument(TypeOfExpression(QualifiedName(namespaceName, IdentifierName(metadataName)))))]))]))
                        .AddMembers(FileScopedNamespaceDeclaration(namespaceName)
                        .AddMembers(ClassDeclaration(metadataName)
                        .AddModifiers(Token(SyntaxKind.InternalKeyword), Token(SyntaxKind.SealedKeyword))
                        .AddBaseListTypes(SimpleBaseType(IdentifierName("TypeManifestProviderBase")))
                        .AddAttributeLists(AttributeList().AddAttributes(Attribute(IdentifierName("EditorBrowsable"))
                        .AddArgumentListArguments(AttributeArgument(MemberAccessExpression(SyntaxKind.SimpleMemberAccessExpression,
                            IdentifierName("EditorBrowsableState"),
                            IdentifierName("Never"))))))
                        .AddMembers(MethodDeclaration(PredefinedType(Token(SyntaxKind.VoidKeyword)), "ConfigureInner")
                        .AddModifiers(Token(SyntaxKind.ProtectedKeyword), Token(SyntaxKind.OverrideKeyword))
                        .AddParameterListParameters(Parameter(Identifier("config")).WithType(IdentifierName("TypeManifestOptions")))
                        .WithBody(Block().AddStatements(registerStates)))))
                        .WithLeadingTrivia(TriviaList(
                            Trivia(NullableDirectiveTrivia(Token(SyntaxKind.EnableKeyword), isActive: true))))
                        .NormalizeWhitespace();
                    context.AddSource($"{metadataName}.g.cs", registerSource.GetText(Encoding.UTF8));
                }
            }
        }
    }

    private sealed class CustomOrleansSerializerCodeGenModel(INamedTypeSymbol symbol, TypeDeclarationSyntax syntax) : IEquatable<CustomOrleansSerializerCodeGenModel>
    {
        public INamedTypeSymbol Symbol { get; } = symbol;
        public TypeDeclarationSyntax Syntax { get; } = syntax;
        public string NamespaceName { get; } = string.Join(".", "CustomOrleansCodeGen", symbol.ContainingAssembly.Name);

        public bool Equals(CustomOrleansSerializerCodeGenModel? other)
        {
            if (other == null) return false;
            return SymbolEqualityComparer.Default.Equals(Symbol, other.Symbol);
        }

        public override bool Equals(object obj)
        {
            return Equals(obj as CustomOrleansSerializerCodeGenModel);
        }

        public override int GetHashCode()
        {
            return SymbolEqualityComparer.Default.GetHashCode(Symbol);
        }
    }
}