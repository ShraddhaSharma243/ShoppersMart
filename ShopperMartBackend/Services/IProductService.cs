using ShopperMartBackend.Dtos.StockEntry;

namespace ShopperMartBackend.Services
{
    public interface IProductService
    {
        Task AddProduct(NewProductRequest request);
    }
}
