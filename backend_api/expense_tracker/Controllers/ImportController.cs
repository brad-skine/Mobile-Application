using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;  

namespace expense_tracker.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/import")] 
    
    public class ImportController : ControllerBase 
    {
        private readonly Services.CsvImportService _csvImportService;
        private Guid GetUserId()
        {
            return Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        }

        public ImportController(Services.CsvImportService csvImportService)
        {
            _csvImportService = csvImportService;
        }

        [HttpPost("transactions")]
        public async Task<IActionResult> ImportTransactions(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Invalid file uploaded");
            }
            
            if (!file.FileName.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("needs a csv file");
            }

            var userId = GetUserId();
            using var stream = file.OpenReadStream();
            var row_count = await _csvImportService.ImportTransactionsAsync(stream, userId);
            return Ok(new { 
                message = "Import successful and data loaded into database",
                inserted = row_count
            });
        }
    }
}
