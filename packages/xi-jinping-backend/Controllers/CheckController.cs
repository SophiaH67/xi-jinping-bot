using Microsoft.AspNetCore.Mvc;
using xi_jinping_backend.Dto;

namespace xi_jinping_backend.Controllers;

[ApiController]
public class CheckController : ControllerBase
{
    [HttpPost("check")]
    public CheckResponseDto Check([FromBody] CheckRequestDto request)
    {
        return new CheckResponseDto
        {
            Messages = new string[] { "You are a good citizen" }
        };
    }
}
