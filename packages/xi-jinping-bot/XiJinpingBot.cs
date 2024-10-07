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
    Ready += OnReady;
    Log += DiscordLog;
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
      try
      {
        await message.Channel.SendMessageAsync(messageToSend);
      }
      catch
      {
        // I would log something, but last time it logged anything (the exception)
        // it filled up my 512GiB disk entirely with error logs. I do not want this
        // to happen again, so I'm just going to ignore it. 🚀
      }
    }
  }

  private async Task OnReady()
  {
    Console.WriteLine($"Xi Jinping Bot is logged in as {CurrentUser.Username}#{CurrentUser.Discriminator}");
    await SetActivityAsync(new Game($"with {Guilds.Count} Chinese econom{(Guilds.Count == 1 ? "y" : "ies")}"));
  }

  private async Task DiscordLog(LogMessage message)
  {
    Console.WriteLine(message.ToString());
    await Task.CompletedTask;
  }
}