using Microsoft.AspNetCore.Mvc;

namespace expense_tracker.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("GET works");
        }
    }
}
