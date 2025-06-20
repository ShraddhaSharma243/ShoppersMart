using ShopperMartBackend.Dtos.StockEntry;

namespace ShopperMartBackend.Services
{
    public interface IStockEntryService
    {
        Task AddProductToStock(StockEntryRequest stockEntryRequest);
    }
}