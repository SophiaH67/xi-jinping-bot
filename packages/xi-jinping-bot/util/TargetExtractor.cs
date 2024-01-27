using Discord;
using Discord.WebSocket;

public class TargetExtractor
{
  public async Task<string?> FindTargetFromMessage(SocketMessage message)
  {
    string? target = null;

    target ??= GetTargetFromMention(message);
    target ??= await GetTargetFromReply(message);
    target ??= await GetTargetFromPreviousMessage(message);

    return target;
  }

  private string? GetTargetFromMention(SocketMessage message)
  {
    if (message.MentionedUsers.Count > 0)
    {
      return message.MentionedUsers.First().Id.ToString();
    }

    return null;
  }

  private async Task<string?> GetTargetFromReply(SocketMessage message)
  {
    if (message.Reference != null)
    {
      Optional<ulong> messageId = message.Reference.MessageId;
      if (messageId.IsSpecified == false)
      {
        return null;
      }

      IMessage repliedMessage = await message.Channel.GetMessageAsync(messageId.Value);
      return repliedMessage.Author.Id.ToString();
    };

    return null;
  }

  private async Task<string?> GetTargetFromPreviousMessage(SocketMessage message)
  {
    IEnumerable<IMessage> messagesEnumerable = await message.Channel.GetMessagesAsync(limit: 2).FlattenAsync();
    List<IMessage> messages = messagesEnumerable.ToList();

    if (messages.Count < 2)
    {
      return null;
    }

    IMessage? previousMessage = messages[1];
    if (previousMessage.Author.Id == message.Author.Id)
    {
      return null;
    }

    return previousMessage.Author.Id.ToString();
  }
}