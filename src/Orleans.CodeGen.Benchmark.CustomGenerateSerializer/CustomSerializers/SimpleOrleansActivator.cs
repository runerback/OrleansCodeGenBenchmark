using Orleans.Serialization.Activators;

namespace Orleans.CodeGen.Benchmark.CustomGenerateSerializer.CustomSerializers;

public abstract class SimpleOrleansActivator<T> : IActivator<T> where T : class, new()
{
    public T Create() => new();
}
