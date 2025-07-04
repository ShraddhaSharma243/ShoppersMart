﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Dtos.StockEntry;
using ShopperMartBackend.Entities;
using ShopperMartBackend.Exceptions;
using ShopperMartBackend.Services;

namespace ShopperMartBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController(ICategoryService categoryService, ShopperMartDBContext dbContext) : Controller
    {
        private readonly ICategoryService _categoryService = categoryService;
        private readonly ShopperMartDBContext _dBContext = dbContext;



        [HttpPost("AddCategory")]
        public async Task<IActionResult> AddCategory([FromBody] CategoryRequest category)
        {
            try
            {
                await _categoryService.AddCategory(category);
                return NoContent();
            } 
            catch (DuplicateCategoryException ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("GetCategories")]
        public async Task<ActionResult<Category>> GetCategories()
        {
            try
            {
                var categories =
                    await _dBContext.Categories.ToListAsync();

                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }
    }
}
