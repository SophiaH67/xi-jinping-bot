using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using xi_jinping_backend.Dto;
using xi_jinping_backend.Models;
using xi_jinping_backend.Services;
using xi_jinping_backend.Utils;

namespace xi_jinping_backend.Controllers;

[ApiController]
public class CheckController(CitizenContext context, CheckService checkService) : ControllerBase
{
    private readonly CitizenContext _context = context;

    [HttpPost("check")]
    public async Task<CheckResponseDto> Check([FromBody] CheckRequestDto request)
    {
        CitizenItem citizen = await _context.FindOrCreate(request.CitizenID, request.CitizenUsername);
        await citizen.AddGuild(request.Guild.Id, _context);

        CitizenItem? targetCitizen = request.TargetCitizenID != null
            ? await _context.CitizenItems.FirstOrDefaultAsync(x => x.DiscordId == request.TargetCitizenID)
            : null;

        CitizenItem[] mentionedCitizens = [];
        foreach (string id in request.MentionedIDs)
        {
            CitizenItem? mentionedCitizen = await _context.CitizenItems.FirstOrDefaultAsync(x => x.DiscordId == id);
            if (mentionedCitizen == null) continue;

            await mentionedCitizen.AddGuild(request.Guild.Id, _context);
            mentionedCitizens = [.. mentionedCitizens, mentionedCitizen];
        }

        RuleArgs ruleArgs = new(citizen, targetCitizen, mentionedCitizens, request.Guild.Id);

        var (messages, change) = await checkService.Check(ruleArgs);

        if (change != 0)
        {
            citizen.SocialCreditScore += change;
            await _context.SaveChangesAsync();
        }

        return new CheckResponseDto
        {
            Messages = messages
        };
    }
}
