using ShopperMartBackend.Entities;

namespace ShopperMartBackend.Dtos.Order
{
    public class OrderItemResponse
    {
        public required string Name { get; set; }
        public required string Category { get; set; }
        public bool IsImported { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Tax { get; set; }
        public decimal SubTotal { get; set; } = 0;
    }
}