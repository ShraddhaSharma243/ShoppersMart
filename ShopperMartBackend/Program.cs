
using Microsoft.EntityFrameworkCore;

using ShopperMartBackend.Data;
using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Services;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        builder.Services.AddDbContext<ShopperMartDBContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("SMConnection"));
        });


        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddSingleton<ITaxService, TaxService>();
        builder.Services.AddScoped<IOrderService, OrderService>();     
        builder.Services.AddScoped<ICategoryService, CategoryService>();
        builder.Services.AddScoped<IProductService, ProductService>();

        var app = builder.Build();
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<ShopperMartDBContext>();
            DataSeeder.SeedData(context);

            var allproducts = context.Products.ToList();
        }


        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors(policy =>
        policy.WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod());

        app.UseHttpsRedirection();

        app.UseAuthorization(); 

        app.MapControllers();

        app.Run();
    }
}