public class FailedToDeserializeException : Exception
{
  public string? Input { get; private set; }

  public FailedToDeserializeException(string? input) : base("Failed to deserialize response from backend")
  {
    Input = input;
  }
}