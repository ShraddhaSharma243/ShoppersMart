using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Dtos.StockEntry;
using ShopperMartBackend.Entities;
using ShopperMartBackend.Exceptions;

namespace ShopperMartBackend.Services
{
    public class CategoryService(DBContext _dBContext) : ICategoryService
    {
        public async Task AddCategory(CategoryRequest request)
        {
            var categoryAlreadyExist = _dBContext.Categories.Any(c=> (c.Name == request.Name));
            if (categoryAlreadyExist)
            {
                throw new DuplicateCategoryException($"{request.Name} already exists.");
            }

            var newCategory = new ProductCategory()
            {
                Id = Guid.NewGuid(),
                Name = request.Name
            };
            _dBContext.Categories.Add(newCategory);
          await _dBContext.SaveChangesAsync();   
        }
    }
}
