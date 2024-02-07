using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using xi_jinping_backend.Dto;

namespace xi_jinping_backend.Controllers;

[Route("[controller]")]
[ApiController]
public class CheckController : ControllerBase
{
    [HttpPost("check")]
    public IActionResult Check([FromBody] CheckRequestDto request)
    {
        return Ok(request);
    }
}
