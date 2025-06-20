using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Dtos.StockEntry;
using ShopperMartBackend.Entities;

namespace ShopperMartBackend.Services
{
    public class StockEntryService : IStockEntryService
    {
        private readonly ShopperMartDBContext _dbContext;
        public StockEntryService(ShopperMartDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task AddProductToStock(StockEntryRequest stockEntryRequest)
        {
            if (!Enum.TryParse(stockEntryRequest.Category, true, out ProductCategory category))
            {
                throw new ArgumentException($"Invalid product category: {stockEntryRequest.Category}");
            }
            var newProduct = new Product()
            {
                Id =Guid.NewGuid(),
                Name = stockEntryRequest.Name,
                Category = category,
                IsImported = stockEntryRequest.IsImported,
                Price = stockEntryRequest.Price,
                QuantityInStock = stockEntryRequest.QuantityInStock
            };
            _dbContext.Products.Add(newProduct);
          await _dbContext.SaveChangesAsync();
        }
    }
}
