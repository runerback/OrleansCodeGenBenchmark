using Orleans.Serialization.Cloning;

namespace Orleans.CodeGen.Benchmark.CustomGenerateSerializer.CustomSerializers;

public abstract class SimpleOrleansCopier<T> : IDeepCopier<T>, IBaseCopier<T>
    where T : class
{
    public T DeepCopy(T input, CopyContext context) => input;

    public void DeepCopy(T input, T output, CopyContext context)
    {
        throw new NotSupportedException("inherited type should use [CustomGenerateSerializer] too");
    }
}
