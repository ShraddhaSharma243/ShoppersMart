using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Entities;

namespace ShopperMartBackend.Data
{
    public class DataSeeder
    {
        public static void SeedData(ShopperMartDBContext _dbContext)
        {
            if (_dbContext.Products.Any())
            {
                return;
            }
            var products = new List<Product>
            {
                new Product
                {
                    Id =  Guid.NewGuid(),
                    Name =  "Music CD",
                    Category = ProductCategory.Entertainment,
                    IsImported  = false,
                    Price = 14.99m,
                    QuantityInStock = 10,
                },
                new Product
                {
                    Id =  Guid.NewGuid(),
                    Name =  "Chocolate Bar",
                    Category = ProductCategory.Food,
                    IsImported  = false,
                    Price = 0.85m,
                    QuantityInStock = 10,
                },
                new Product
                {
                    Id =  Guid.NewGuid(),
                    Name =  "Chocolate",
                    Category = ProductCategory.Food,
                    IsImported  = true,
                    Price = 10.00m,
                    QuantityInStock = 10,
                },
                new Product
                {
                    Id =  Guid.NewGuid(),
                    Name =  "Perfume",
                    Category = ProductCategory.Misc,
                    IsImported  = true,
                    Price = 47.50m,
                    QuantityInStock = 10,
                }

            };
            _dbContext.Products.AddRange(products);
            _dbContext.SaveChanges();
        }
    }
}
