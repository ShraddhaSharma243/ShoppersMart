using ShopperMartBackend.Dtos.Product;

namespace ShopperMartBackend.Services
{
    public interface IProductService
    {
        Task AddProduct(ProductRequest request);

        Task<ProductsResponse> GetProducts();
    }
}
