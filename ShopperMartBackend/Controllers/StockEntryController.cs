using Microsoft.AspNetCore.Mvc;
using ShopperMartBackend.Dtos.StockEntry;
using ShopperMartBackend.Services;

namespace ShopperMartBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockEntryController(IStockEntryService stockEntryService) : Controller
    {
        private readonly IStockEntryService _stockEntryService = stockEntryService;

        [HttpPost]
        public async Task<IActionResult> AddProductToStock([FromBody] StockEntryRequest stockEntryRequest)
        {
            try
            {
                await _stockEntryService.AddProductToStock(stockEntryRequest);
                return NoContent();
                
            }
            catch (ArgumentException ex) {
                   return BadRequest(ex.Message);
            }
        }
    }
}
