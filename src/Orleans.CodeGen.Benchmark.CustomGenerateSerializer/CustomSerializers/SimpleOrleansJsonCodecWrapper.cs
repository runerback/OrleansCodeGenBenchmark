using System.Text.Json;

namespace Orleans.CodeGen.Benchmark.CustomGenerateSerializer.CustomSerializers;

[Serializable]
[GenerateSerializer]
[Immutable]
public sealed class SimpleOrleansJsonCodecWrapper<T> where T : class, new()
{
    [NonSerialized]
    private T? _value;
    [Id(0)]
    private string? _json;

    public T Value
    {
        get
        {
            if (_value == null)
            {
                if (string.IsNullOrEmpty(_json))
                {
                    return new();
                }
                return _value = JsonSerializer.Deserialize<T>(_json) ?? new();
            }
            return _value;
        }
        set
        {
            _value = value;
            _json = JsonSerializer.Serialize(value);
        }
    }
}
