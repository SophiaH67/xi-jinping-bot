using System.Net.Http.Headers;
using Discord.WebSocket;
using Newtonsoft.Json;

public class Backend
{
  private readonly HttpClient _httpClient;

  public Backend(HttpClient httpClient)
  {
    _httpClient = httpClient;
  }

  /// <summary>
  /// Process a message by sending it to the backend and returning the responses.
  /// </summary>
  /// <param name="message"></param>
  /// <returns>Tasks that resolve to an array of messages to send back to the channel.</returns>
  /// <exception cref="FailedToSendMessageException"></exception>
  /// <exception cref="FailedToDeserializeException"></exception>
  public async Task<string[]> ProcessMessage(SocketMessage message)
  {
    XiJinpingMessageDto dto = await XiJinpingMessageDto.FromMessage(message);

    HttpRequestMessage request = new(HttpMethod.Post, "http://localhost:3000/check");

    request.Content = new StringContent(JsonConvert.SerializeObject(dto));
    request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

    HttpResponseMessage response = await _httpClient.SendAsync(request);

    if (response.IsSuccessStatusCode == false)
    {
      throw new FailedToSendMessageException(response.StatusCode, await response.Content.ReadAsStringAsync());
    }

    string responseJson = await response.Content.ReadAsStringAsync();
    XiJinpingResponseDto? responseDto = JsonConvert.DeserializeObject<XiJinpingResponseDto>(responseJson);

    if (responseDto?.Messages == null)
    {
      throw new FailedToDeserializeException(responseJson);
    }

    return responseDto.Messages;
  }
}