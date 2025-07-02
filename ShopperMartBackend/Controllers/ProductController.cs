using Microsoft.AspNetCore.Mvc;
using ShopperMartBackend.Dtos.Product;
using ShopperMartBackend.Exceptions;
using ShopperMartBackend.Services;

namespace ShopperMartBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController(IProductService _productService) : Controller
    {
        [HttpGet]
        public async Task<ActionResult<ProductsResponse>> GetProducts()
        {
            ProductsResponse response = await _productService.GetProducts();
            return Ok(response);
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] ProductRequest request)
        {
            try
            {
                await _productService.AddProduct(request);
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
