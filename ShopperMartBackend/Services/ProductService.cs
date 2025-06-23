
using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Dtos.StockEntry;
using ShopperMartBackend.Entities;
using ShopperMartBackend.Exceptions;
using System.Text.RegularExpressions;

namespace ShopperMartBackend.Services
{
    public class ProductService : IProductService
    {
        private readonly ShopperMartDBContext _dbContext;
        public ProductService(ShopperMartDBContext dBContext)
        {
            _dbContext = dBContext;
        }
        public async Task AddProduct(NewProductRequest request)
        {
            this.ValidateName(request);
            this.ValidateCategories(request);
            this.ValidatePrice(request);
            this.ValidateQuantity(request);

            var newProduct = new Product()
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Category = request.Category,
                IsImported = request.IsImported,
                Price = request.Price,
                QuantityInStock = request.QuantityInStock
            };
            _dbContext.Products.Add(newProduct);
            await _dbContext.SaveChangesAsync();
        }

        private void ValidateQuantity(NewProductRequest request)
        {
            if (request.QuantityInStock < 1)
            {
                throw new MinimumQuantityException($"Minimum quantity is 1. ");
            }
        }

        private void ValidatePrice(NewProductRequest request)
        {
            var minPrice = 0.01m;
            if (request.Price.CompareTo(minPrice) < 0)
            {
                throw new MinimumPriceException($"Minimum price is 1 cent.");
            }
        }

        private void ValidateCategories(NewProductRequest request)
        {
            if(request.Category == "")
            {
                throw new CategoryRequiredException("Category name is required.");
            }
            if (!_dbContext.Categories.Any(c => (c.Name == request.Category)))
            {
                throw new InvalidProductCategoryException($"Category {request.Category} does not exist.");
            }
        }

        private void ValidateName(NewProductRequest request)
        {
           var name = request.Name;
            if (name == "")
            {
                throw new NameRequiredException("Name is required.");
            }
            if (_dbContext.Products.Any(p => ((p.Name == name) && p.Category == request.Category)))
            {
                throw new ProductAlreadyExistException($"Product {name} in Category {request.Category} already exists. ");
            }
            if(name.Length<3 || name.Length > 255) {
                throw new InvalidNameException("Name length must be greater then 3 and less then 255");
            }
            if(!Regex.IsMatch(name, @"^[a-zA-Z'-]+$"))
            {
                throw new InvalidNameException("Name can only contain alphabets, - and ' sign"); 
            }

        }
    }
}
