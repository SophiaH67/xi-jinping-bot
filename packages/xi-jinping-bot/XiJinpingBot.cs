using Discord;
using Discord.WebSocket;

// var config = 

public class XiJinpingBot : DiscordSocketClient
{
  public XiJinpingBot() : base(new DiscordSocketConfig
  {
    GatewayIntents = GatewayIntents.Guilds | GatewayIntents.GuildMessages | GatewayIntents.MessageContent | GatewayIntents.DirectMessages,
  })
  {
    Log += this.LogF;
    MessageReceived += MessageReceivedF;
  }

  private Task LogF(LogMessage msg)
  {
    Console.WriteLine(msg.ToString());
    return Task.CompletedTask;
  }

  private async Task MessageReceivedF(SocketMessage message)
  {
    Console.WriteLine(message.Content);
    Console.WriteLine(message.Author.GlobalName);
    if (message.Content == "ping")
    {
      await message.Channel.SendMessageAsync("pong!");
    }
  }

}