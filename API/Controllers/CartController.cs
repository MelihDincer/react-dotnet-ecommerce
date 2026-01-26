using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;
    public CartController(DataContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<ActionResult<Cart>> GetCart()
    {
        var cart = await GetOrCreateCart();
        return cart;
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        var cart = await GetOrCreateCart();
        var product = await _context.Products.FirstOrDefaultAsync(p=>p.Id==productId);
        if(product == null)
        {
            return NotFound("the product is not in database");
        }
        cart.AddItem(product, quantity);
        var result = await _context.SaveChangesAsync() > 0;
        if(result)
        {
            return CreatedAtAction(nameof(GetCart),cart);
        }
        return BadRequest(new ProblemDetails{Title="The product can not be added to cart"});
    }

    private async Task<Cart> GetOrCreateCart()
    {
        var cart = await _context.Carts.Include(x=>x.CartItems).ThenInclude(x=>x.Product).Where(x=>x.CustomerId==Request.Cookies["customerId"]).FirstOrDefaultAsync();

        if(cart == null)
        {
            var customerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                Expires = DateTime.Now.AddMonths(1),
                IsEssential = true
            };
            Response.Cookies.Append("customerId", customerId, cookieOptions);
            cart = new Cart {CustomerId=customerId};
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }
        return cart;
    }
}