using System.Net.Http.Headers;
using Discord;
using Discord.WebSocket;
using Newtonsoft.Json;

public class XiJinpingBot : DiscordSocketClient
{
  private readonly HttpClient httpClient = new();

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

  private async Task<string[]> SendMessageToBackend(SocketMessage message)
  {
    XiJinpingMessageDto dto = await XiJinpingMessageDto.FromMessage(message);
    string json = JsonConvert.SerializeObject(dto);

    HttpRequestMessage request = new(HttpMethod.Post, "http://localhost:3000/check");
    request.Content = new StringContent(json);
    request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

    HttpResponseMessage response = await httpClient.SendAsync(request);

    if (response.IsSuccessStatusCode == false)
    {
      throw new Exception($"Failed to send message to backend: {response.StatusCode} {await response.Content.ReadAsStringAsync()}");
    }

    string responseJson = await response.Content.ReadAsStringAsync();
    XiJinpingResponseDto? responseDto = JsonConvert.DeserializeObject<XiJinpingResponseDto>(responseJson);

    if (responseDto?.Messages == null)
    {
      throw new Exception($"Failed to deserialize response from backend: {responseJson}");
    }

    return responseDto.Messages;
  }

  private async Task MessageReceivedF(SocketMessage message)
  {
    if (message.Author.Id == CurrentUser.Id)
    {
      return;
    }

    string[] messages = await SendMessageToBackend(message);

    foreach (string messageToSend in messages)
    {
      await message.Channel.SendMessageAsync(messageToSend);
    }
  }

}