﻿// See https://aka.ms/new-console-template for more information
using Discord;

public class Program
{
  public static Task Main(string[] args) => new Program().MainAsync();

  public async Task MainAsync()
  {
    // I like .env files okay
    DotNetEnv.Env.Load();

    XiJinpingBot bot = new();

    string? token = Environment.GetEnvironmentVariable("TOKEN") ?? throw new Exception("TOKEN is not set");

    await bot.LoginAsync(TokenType.Bot, token);
    await bot.StartAsync();

    // Block this task until the program is closed.
    await Task.Delay(-1);
  }
}