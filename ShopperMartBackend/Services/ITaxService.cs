using ShopperMartBackend.Entities;

namespace ShopperMartBackend.Services
{
    public interface ITaxService
    {
        decimal CalculateTax(Product product, int quantity);
    }
}