using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace expense_tracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TestController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("test-db")]
        public IActionResult TestDb()
        {
            try
            {
                var connString = _configuration.GetConnectionString("DefaultConnection");

                using var conn = new NpgsqlConnection(connString);
                conn.Open(); // Try opening connection

                // Optional: simple query to verify DB access
                using var cmd = new NpgsqlCommand("SELECT 1", conn);
                var result = cmd.ExecuteScalar();

                return Ok(new
                {
                    Message = "Database connection successful!",
                    QueryResult = result
                });
            }
            catch (Exception ex)
            {
                // Return the exception message for debugging
                return StatusCode(500, new
                {
                    Message = "Database connection failed",
                    Error = ex.Message,
                    StackTrace = ex.StackTrace
                });
            }
        }
    }
}
