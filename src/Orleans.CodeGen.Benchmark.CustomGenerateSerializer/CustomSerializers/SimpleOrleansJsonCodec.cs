using System.Buffers;
using Orleans.Serialization.Codecs;
using Orleans.Serialization.GeneratedCodeHelpers;
using Orleans.Serialization.Serializers;
using Orleans.Serialization.WireProtocol;

namespace Orleans.CodeGen.Benchmark.CustomGenerateSerializer.CustomSerializers;

public abstract class SimpleOrleansJsonCodec<T> : IFieldCodec<T>, IBaseCodec<T>
    where T : class, new()
{
    private readonly Type _codecFieldType = typeof(SimpleOrleansJsonCodecWrapper<T>);
    private readonly Type _type0 = typeof(T);
    private readonly IFieldCodec<SimpleOrleansJsonCodecWrapper<T>> _jsonWrapperCodec;

    public SimpleOrleansJsonCodec(ICodecProvider codecProvider)
    {
        _jsonWrapperCodec = OrleansGeneratedCodeHelper.GetService<IFieldCodec<SimpleOrleansJsonCodecWrapper<T>>>(this, codecProvider);
    }

    public void Deserialize<TInput>(ref Serialization.Buffers.Reader<TInput> reader, T value)
    {
        (_jsonWrapperCodec as IBaseCodec<SimpleOrleansJsonCodecWrapper<T>>)?.Deserialize(ref reader, new SimpleOrleansJsonCodecWrapper<T>
        {
            Value = value,
        });
    }

    public T ReadValue<TInput>(ref Serialization.Buffers.Reader<TInput> reader, Field field)
    {
        return _jsonWrapperCodec.ReadValue(ref reader, field).Value;
    }

    public void Serialize<TBufferWriter>(ref Serialization.Buffers.Writer<TBufferWriter> writer, T value) where TBufferWriter : IBufferWriter<byte>
    {
        _jsonWrapperCodec.WriteField(ref writer, 0u, _type0, value);
    }

    public void WriteField<TBufferWriter>(ref Serialization.Buffers.Writer<TBufferWriter> writer, uint fieldIdDelta, Type expectedType, T value) where TBufferWriter : IBufferWriter<byte>
    {
        _jsonWrapperCodec.WriteField(ref writer, fieldIdDelta, _codecFieldType, new SimpleOrleansJsonCodecWrapper<T>
        {
            Value = value,
        });
    }
}