using xi_jinping_backend.Models;
using xi_jinping_backend.Rules;
using xi_jinping_backend.Utils;

namespace xi_jinping_backend.Services;

public class CheckService
{
  private Rule[] rules = [
    new TestRule()
  ];

  public async Task<(string[], int)> Check(CitizenItem citizen, CitizenItem? targetCitizen, CitizenItem[] mentionedCitizens, string guildId)
  {
    string[] messages = [];
    int score = 0;

    foreach (Rule rule in rules)
    {
      (string[] ruleMessages, int ruleScore) = await rule.Check(new RuleArgs(citizen, targetCitizen, mentionedCitizens, guildId));
      messages = [.. messages, .. ruleMessages];
      score += ruleScore;
    }

    return (messages, score);
  }
}
