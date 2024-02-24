using System.Data;
using xi_jinping_backend.Utils;

namespace xi_jinping_backend.Rules;


public class TestRule : Utils.Rule
{
  public override Task<(string[], int)> Check(RuleArgs args)
  {
    return Task.FromResult((new string[] { "You are a good citizen" }, 0));
  }
}
