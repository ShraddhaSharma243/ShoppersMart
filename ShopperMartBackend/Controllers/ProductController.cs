using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Dtos.Product;
using ShopperMartBackend.Exceptions;
using ShopperMartBackend.Services;

namespace ShopperMartBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<ProductsResponse>> GetProducts()
        {
            ProductsResponse response = await _productService.GetProducts();
            return Ok(response);
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] ProductRequest newProductRequest)
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
