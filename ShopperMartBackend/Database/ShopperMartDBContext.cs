using Microsoft.EntityFrameworkCore;
using ShopperMartBackend.Entities;

namespace ShopperMartBackend.DatabaseContext
{
    public class ShopperMartDBContext : DbContext
    {
        public ShopperMartDBContext(DbContextOptions<ShopperMartDBContext> options)
        : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> Items { get; set; }
        public DbSet<ProductCategory> Categories { get; set; }
      
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasKey(e => e.Id);
            modelBuilder.Entity<Product>().Property(e => e.Name).HasMaxLength(200);
            modelBuilder.Entity<Product>().Property(e => e.Category).HasMaxLength(200);

            modelBuilder.Entity<OrderItem>().HasKey(e => e.Id);
            modelBuilder.Entity<OrderItem>()
                .HasOne(e => e.Order)
                .WithMany(e => e.Items)
                .IsRequired();

            modelBuilder.Entity<OrderItem>()
                .HasOne(e => e.Product)
                .WithMany();

            modelBuilder.Entity<Order>().HasKey(e => e.Id);
            modelBuilder.Entity<ProductCategory>().HasKey(e=> e.Id);
        }
    }

}
