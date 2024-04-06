using xi_jinping_backend.Models;
using xi_jinping_backend.Rules;
using xi_jinping_backend.Utils;

namespace xi_jinping_backend.Services;

public class CheckService
{
  private readonly Rule[] rules = [
    new ConsequencesRule(),
    new GoodChinaRule()
  ];

  public async Task<(string[], int)> Check(RuleArgs ruleArgs)
  {
    string[] messages = [];
    int score = 0;

    foreach (Rule rule in rules)
    {
      (string[] ruleMessages, int ruleScore) = await rule.Check(ruleArgs);
      messages = [.. messages, .. ruleMessages];
      score += ruleScore;
    }

    return (messages, score);
  }
}
