using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
        
    }
    public DbSet<Product> Products { get; set; }
    public DbSet<Cart> Carts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Product>().HasData(
            new List<Product>
            {
                new Product{ Id=1, Name="IPhone 15", Description="Telefon açıklaması", ImageUrl="1.JPG", Price=54000, IsActive=true, Stock=100},
                new Product{ Id=2, Name="IPhone 16", Description="Telefon açıklaması", ImageUrl="2.JPG", Price=65000, IsActive=true, Stock=100},
                new Product{ Id=3, Name="IPhone17", Description="Telefon açıklaması", ImageUrl="3.JPG", Price=75000, IsActive=true, Stock=100},
                new Product{ Id=4, Name="IPhone17 Pro", Description="Telefon açıklaması", ImageUrl="4.JPG", Price=90000, IsActive=true, Stock=100},
            }
        );
    }
}