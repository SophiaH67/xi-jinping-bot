using Newtonsoft.Json;

public class XiJinpingResponseDto
{
  [JsonProperty(PropertyName = "messages")]
  public string[] Messages { get; set; }
}