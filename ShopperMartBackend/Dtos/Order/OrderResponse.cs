namespace ShopperMartBackend.Dtos.Order
{
    public class OrderResponse
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Total { get; set; } = decimal.Zero;
        public List<OrderItemResponse> OrderItems { get; set; } = new List<OrderItemResponse>();
    }
}
