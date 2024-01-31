// See https://aka.ms/new-console-template for more information
using Discord;

public class Program
{
  public static async Task Main(string[] args)
  {
    // Load in .env files if they exist
    DotNetEnv.Env.TraversePath().Load();

    XiJinpingBot bot = new();

    string? token = Environment.GetEnvironmentVariable("TOKEN") ?? throw new Exception("TOKEN is not set");

    await bot.LoginAsync(TokenType.Bot, token);
    await bot.StartAsync();

    // Block this task until the program is closed.
    await Task.Delay(-1);
  }
}