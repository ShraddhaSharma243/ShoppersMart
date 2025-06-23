using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Dtos.Product;
using ShopperMartBackend.Dtos.StockEntry;
using ShopperMartBackend.Exceptions;
using ShopperMartBackend.Services;

using ProductAlreadyExistException = ShopperMartBackend.Exceptions.ProductAlreadyExistException;

namespace ShopperMartBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly ShopperMartDBContext _dbContext;
        private readonly IProductService _productService;
        public ProductController(ShopperMartDBContext dbContext, IProductService productService)
        {
            _dbContext = dbContext;
            _productService = productService;
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
                    Category = product.Category,
                    IsImported = product.IsImported,
                    Price = product.Price,
                    QuantityInStock = product.QuantityInStock
                }).ToListAsync());

            return Ok(response);
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProductToStock([FromBody] NewProductRequest newProductRequest)
        {
            try
            {
                await _productService.AddProduct(newProductRequest);
                return NoContent();

            }
            catch (InvalidProductCategoryException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ProductAlreadyExistException ex)
            { 
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
