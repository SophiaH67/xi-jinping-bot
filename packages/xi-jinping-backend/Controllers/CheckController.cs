using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using xi_jinping_backend.Dto;
using xi_jinping_backend.Models;
using xi_jinping_backend.Services;

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

        (string[], int) result = await checkService.Check(citizen, targetCitizen, mentionedCitizens, request.Guild.Id);

        citizen.SocialCreditScore += result.Item2;
        await _context.SaveChangesAsync();

        return new CheckResponseDto
        {
            Messages = result.Item1
        };
    }
}
