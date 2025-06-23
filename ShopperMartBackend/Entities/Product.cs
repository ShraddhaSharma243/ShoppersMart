

namespace ShopperMartBackend.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public required string Name { get; set; } 
        public required string Category { get; set; }
        public bool IsImported { get; set; }
        public decimal Price { get; set; }
        public int QuantityInStock { get; set; }
    }
}
