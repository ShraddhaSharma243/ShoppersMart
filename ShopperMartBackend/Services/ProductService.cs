
using Microsoft.EntityFrameworkCore;
using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Dtos.Product;
using ShopperMartBackend.Entities;
using ShopperMartBackend.Exceptions;
using System.Text.RegularExpressions;

namespace ShopperMartBackend.Services
{
    public class ProductService(DBContext _dBContext) : IProductService
    {
        public async Task AddProduct(ProductRequest request)
        {
            this.ValidateName(request);
            this.ValidateCategories(request);
            this.ValidatePrice(request);
            this.ValidateQuantity(request);

            var newProduct = CreateProduct(request);
            _dBContext.Products.Add(newProduct);
            
            await _dBContext.SaveChangesAsync();
        }

        private static Product CreateProduct(ProductRequest request)
        {
            return new()
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Category = request.Category,
                IsImported = request.IsImported,
                Price = request.Price,
                QuantityInStock = request.QuantityInStock
            };
        }

        public async Task<ProductsResponse> GetProducts()
        {
            var response = new ProductsResponse();
            response.Products.AddRange(
                await _dBContext.Products.Select(product => new ProductResponse()
                {
                    Id = product.Id,
                    Name = product.Name,
                    Category = product.Category,
                    IsImported = product.IsImported,
                    Price = product.Price,
                    QuantityInStock = product.QuantityInStock
                }).ToListAsync());

            return response;
        }

        private void ValidateQuantity(ProductRequest request)
        {
            if (request.QuantityInStock < 1)
            {
                throw new MinimumQuantityException($"Minimum quantity is 1. ");
            }
        }

        private void ValidatePrice(ProductRequest request)
        {
            var minPrice = 0.01m;
            if (request.Price.CompareTo(minPrice) < 0)
            {
                throw new MinimumPriceException($"Minimum price is 1 cent.");
            }
        }

        private void ValidateCategories(ProductRequest request)
        {
            if(request.Category == "")
            {
                throw new CategoryRequiredException("Category name is required.");
            }
            if (!_dBContext.Categories.Any(c => (c.Name == request.Category)))
            {
                throw new InvalidProductCategoryException($"Category {request.Category} does not exist.");
            }
        }

        private void ValidateName(ProductRequest request)
        {
           var name = request.Name;
            if (name == "")
            {
                throw new NameRequiredException("Name is required.");
            }
            if (_dBContext.Products.Any(p => ((p.Name == name) && p.Category == request.Category)))
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
