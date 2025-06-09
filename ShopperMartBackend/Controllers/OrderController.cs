using Microsoft.AspNetCore.Mvc;

using ShopperMartBackend.Dtos.Order;
using ShopperMartBackend.Exceptions;
using ShopperMartBackend.Services;

namespace ShopperMartBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<OrderResponse>> CreateOrder([FromBody] OrderRequest request)
        {
            try
            {
                var response = await _orderService.ProcessOrderAsync(request);

                return Ok(response);
            }
            catch (Exception ex) when (ex is ProductNotFoundException || ex is InvalidOrderException) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
