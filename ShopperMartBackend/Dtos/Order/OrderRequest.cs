namespace ShopperMartBackend.Dtos.Order
{
    public class OrderRequest
    {
        public List<OrderItemRequest> OrderItemRequests { get; set; } = [];
    }
}
