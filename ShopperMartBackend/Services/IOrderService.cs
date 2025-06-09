using ShopperMartBackend.Dtos.Order;

namespace ShopperMartBackend.Services
{
    public interface IOrderService
    {
       Task<OrderResponse> ProcessOrderAsync(OrderRequest request);
    }
}
