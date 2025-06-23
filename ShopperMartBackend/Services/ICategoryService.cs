using ShopperMartBackend.Dtos.StockEntry;

namespace ShopperMartBackend.Services
{
    public interface ICategoryService
    {
        Task AddCategory(CategoryRequest category);
        
    }
}