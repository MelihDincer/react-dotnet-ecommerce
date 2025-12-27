using API.Entity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetProducts()
    {
        return Ok(new List<Product>()
        {
            new Product{ Id=1, Name="IPhone 15", Description="Telefon açıklaması", ImageUrl="1.JPG", Price=54000, IsActive=true, Stock=100},
            new Product{ Id=1, Name="IPhone 16", Description="Telefon açıklaması", ImageUrl="1.JPG", Price=54000, IsActive=true, Stock=100},
            new Product{ Id=1, Name="IPhone 17", Description="Telefon açıklaması", ImageUrl="1.JPG", Price=54000, IsActive=true, Stock=100}
        });
    }

    [HttpGet("{id}")]
    public IActionResult GetProduct(int id)
    {
        return Ok(new Product{ Id=1, Name="IPhone 15", Description="Telefon açıklaması", ImageUrl="1.JPG", Price=54000, IsActive=true, Stock=100});
    }
}