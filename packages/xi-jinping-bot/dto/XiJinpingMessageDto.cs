using Discord;

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


  public static async Task<XiJinpingMessageDto> FromMessage(SocketMessage message)
  {
    var target = await FindTargetFromMessage(message);
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

  private static async Task<string?> FindTargetFromMessage(SocketMessage message)
  {
    // See if there are any mentions
    if (message.MentionedUsers.Count > 0)
    {
      return message.MentionedUsers.First().Id.ToString();
    }

    // See if there is a reply

    if (message.Reference != null)
    {
      var messageId = message.Reference.MessageId;
      if (messageId.IsSpecified == false)
      {
        return null;
      }

      var repliedMessage = await message.Channel.GetMessageAsync(messageId.Value);
      return repliedMessage.Author.Id.ToString();
    };

    // Get the previous message
    var messagesEnumerable = await message.Channel.GetMessagesAsync(limit: 2).FlattenAsync();
    // Convert the IAsyncEnumerable<IMessage> to a List<IMessage>
    var messages = messagesEnumerable.ToList();

    if (messages.Count < 2)
    {
      return null;
    }

    var previousMessage = messages[1];
    if (previousMessage.Author.Id == message.Author.Id)
    {
      return null;
    }

    return previousMessage.Author.Id.ToString();
  }
}