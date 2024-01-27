using Discord;
using Discord.WebSocket;

public class TargetExtractor
{
  public static async Task<string?> FindTargetFromMessage(SocketMessage message)
  {
    // See if there are any mentions
    if (message.MentionedUsers.Count > 0)
    {
      return message.MentionedUsers.First().Id.ToString();
    }

    // See if there is a reply

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

    // Get the previous message
    IEnumerable<IMessage> messagesEnumerable = await message.Channel.GetMessagesAsync(limit: 2).FlattenAsync();
    // Convert the IAsyncEnumerable<IMessage> to a List<IMessage>
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