using xi_jinping_backend.Utils;

namespace xi_jinping_backend.Rules;


public class ConsequencesRule : Rule
{
  private readonly Random random = new();

  public override Task<(string[], int)> Check(RuleArgs args)
  {

    if (args.citizen.SocialCreditScore < 500 && random.NextDouble() > 0.9)
      return Task.FromResult((new string[] { "你散发着资本主义的气息" }, 0));


    return Task.FromResult(EmptyResponse);
  }
}
