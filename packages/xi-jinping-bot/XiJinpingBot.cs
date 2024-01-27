using Discord;
using Discord.WebSocket;

public class XiJinpingBot : DiscordSocketClient
{
  private readonly Backend _backend;

  public XiJinpingBot() : base(new DiscordSocketConfig
  {
    GatewayIntents = GatewayIntents.Guilds | GatewayIntents.GuildMessages | GatewayIntents.MessageContent | GatewayIntents.DirectMessages,
  })
  {
    _backend = new Backend(new HttpClient());

    MessageReceived += HandleMessage;
  }

  private async Task HandleMessage(SocketMessage message)
  {
    if (message.Author.Id == CurrentUser.Id)
    {
      return;
    }

    string[] messages = await _backend.ProcessMessage(message);

    foreach (string messageToSend in messages)
    {
      await message.Channel.SendMessageAsync(messageToSend);
    }
  }

}