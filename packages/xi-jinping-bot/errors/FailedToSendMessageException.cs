using System.Net;

public class FailedToSendMessageException : Exception
{
  public HttpStatusCode StatusCode { get; private set; }
  public string? Input { get; private set; }

  public FailedToSendMessageException(HttpStatusCode statusCode, string? input) : base("Failed to deserialize response from backend")
  {
    StatusCode = statusCode;
    Input = input;
  }
}