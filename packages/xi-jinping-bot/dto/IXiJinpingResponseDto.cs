using Newtonsoft.Json;

public interface IXiJinpingResponseDto
{
  [JsonProperty(PropertyName = "messages")]
  public string[] Messages { get; set; }
}