namespace xi_jinping_backend.Dto;


public class CheckRequestDto
{
  public string CitizenID { get; set; }
  public string CitizenUsername { get; set; }
  public GuildDto Guild { get; set; }
  public string Message { get; set; }
  public string TargetCitizenID { get; set; }
  public string[] MentionedIDs { get; set; }
}
