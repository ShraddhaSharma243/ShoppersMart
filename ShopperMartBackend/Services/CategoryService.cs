using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Dtos.StockEntry;
using ShopperMartBackend.Entities;
using ShopperMartBackend.Exceptions;

namespace ShopperMartBackend.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ShopperMartDBContext _dbContext;
        public CategoryService(ShopperMartDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task AddCategory(CategoryRequest category)
        {
            var categoryAlreadyExist = _dbContext.Categories.Any(c=> (c.Name == category.Name));
            if (categoryAlreadyExist)
            {
                throw new DuplicateCategoryException($"{category.Name} already exists.");
            }

            var newCategory = new ProductCategory()
            {
                Id = Guid.NewGuid(),
                Name = category.Name
            };
            _dbContext.Categories.Add(newCategory);
          await _dbContext.SaveChangesAsync();   
        }
    }
}
