namespace xi_jinping_backend.Utils;

public abstract class Rule
{
  public abstract Task<(string[], int)> Check(RuleArgs args);
}
