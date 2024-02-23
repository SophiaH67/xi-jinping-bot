using xi_jinping_backend.Models;

namespace xi_jinping_backend.Services;

public class CheckService
{
  public Task<(string[], int)> Check(CitizenItem citizen, CitizenItem? targetCitizen, CitizenItem[] mentionedCitizens, string guildId)
  {
    return Task.FromResult((new string[] { "You are a good citizen" }, 0));
  }
}
