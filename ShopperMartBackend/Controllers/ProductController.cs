using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Dtos.Product;

namespace ShopperMartBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly ShopperMartDBContext _dbContext;
        public ProductController(ShopperMartDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<ProductsResponse>> GetProducts()
        {
            var response = new ProductsResponse();
            response.Products.AddRange(
                await _dbContext.Products.Select(product => new ProductResponse()
                {
                    Id = product.Id,
                    Name = product.Name,
                    Category = product.Category.ToString(),
                    IsImported = product.IsImported,
                    Price = product.Price,
                    QuantityInStock = product.QuantityInStock
                }).ToListAsync());

            return Ok(response);
        }
    }
}
