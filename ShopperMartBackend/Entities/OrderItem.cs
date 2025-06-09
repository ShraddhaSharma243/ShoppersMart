namespace ShopperMartBackend.Entities
{
    public class OrderItem
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public decimal Tax { get; set; }
        public decimal SubTotal { get; set; }
        public required Product Product { get; set; }
        public required Order Order { get; set; }
    }
}
