using Discord.WebSocket;
using Newtonsoft.Json;

class XiJinpingMessageDto
{
  [JsonProperty(PropertyName = "citizenID")]
  public string CitizenID { get; set; } = string.Empty;

  [JsonProperty(PropertyName = "citizenUsername")]
  public string CitizenUsername { get; set; } = string.Empty;

  [JsonProperty(PropertyName = "guild")]
  public XiJinpingGuildDto? Guild { get; set; }

  [JsonProperty(PropertyName = "message")]
  public string Message { get; set; } = string.Empty;

  [JsonProperty(PropertyName = "targetCitizenID")]
  public string? TargetCitizenID { get; set; }

  [JsonProperty(PropertyName = "mentionedIDs")]
  public string[] MentionedIDs { get; set; } = [];


  public static async Task<XiJinpingMessageDto> FromMessage(SocketMessage message)
  {
    TargetExtractor targetExtractor = new();
    string? target = await targetExtractor.FindTargetFromMessage(message);

    XiJinpingGuildDto? guild = null;
    if (message.Channel is SocketGuildChannel channel)
    {
      guild = new XiJinpingGuildDto
      {
        ID = channel.Guild.Id.ToString(),
        Name = channel.Guild.Name,
      };
    }


    return new XiJinpingMessageDto
    {
      CitizenID = message.Author.Id.ToString(),
      CitizenUsername = message.Author.Username,
      Guild = guild,
      Message = message.Content,
      TargetCitizenID = target,
      MentionedIDs = message.MentionedUsers.Select(user => user.Id.ToString()).ToArray(),
    };
  }
}