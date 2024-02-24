using xi_jinping_backend.Models;

namespace xi_jinping_backend.Utils;


public class RuleArgs(CitizenItem citizen, CitizenItem? targetCitizen, CitizenItem[] mentionedCitizens, string guildId)
{
  public CitizenItem citizen = citizen;
  public CitizenItem? targetCitizen = targetCitizen;
  public CitizenItem[] mentionedCitizens = mentionedCitizens;
  public string guildId = guildId;
}