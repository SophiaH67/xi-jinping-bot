using Discord.WebSocket;
using Newtonsoft.Json;

class XiJinpingMessageDto
{
  [JsonProperty(PropertyName = "citizenID")]
  public string CitizenID { get; set; }

  [JsonProperty(PropertyName = "citizenUsername")]
  public string CitizenUsername { get; set; }

  [JsonProperty(PropertyName = "guild")]
  public XiJinpingGuildDto? Guild { get; set; }

  [JsonProperty(PropertyName = "message")]
  public string Message { get; set; }

  [JsonProperty(PropertyName = "targetCitizenID")]
  public string? TargetCitizenID { get; set; }

  [JsonProperty(PropertyName = "mentionedIDs")]
  public string[] MentionedIDs { get; set; }

  private XiJinpingMessageDto(
    string citizenID,
    string citizenUsername,
    XiJinpingGuildDto? guild,
    string message,
    string? targetCitizenID,
    string[] mentionedIDs
  )
  {
    CitizenID = citizenID;
    CitizenUsername = citizenUsername;
    Guild = guild;
    Message = message;
    TargetCitizenID = targetCitizenID;
    MentionedIDs = mentionedIDs;
  }


  public static async Task<XiJinpingMessageDto> FromMessage(SocketMessage message)
  {
    TargetExtractor targetExtractor = new();
    string? target = await targetExtractor.FindTargetFromMessage(message);

    XiJinpingGuildDto? guild = null;
    if (message.Channel is SocketGuildChannel channel)
    {
      guild = new XiJinpingGuildDto(channel.Guild.Id.ToString(), channel.Guild.Name);
    }


    return new XiJinpingMessageDto(
      message.Author.Id.ToString(),
      message.Author.Username,
      guild,
      message.Content,
      target,
      message.MentionedUsers.Select(user => user.Id.ToString()).ToArray()
    );
  }
}