using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

using ShopperMartBackend.DatabaseContext;
using ShopperMartBackend.Dtos.Order;
using ShopperMartBackend.Entities;
using ShopperMartBackend.Exceptions;

namespace ShopperMartBackend.Services
{
    public class OrderService(ShopperMartDBContext dbContext, ITaxService taxService) : IOrderService
    {
        private readonly ShopperMartDBContext _dbContext = dbContext;
        private readonly ITaxService _taxService = taxService;

        public async Task<OrderResponse> ProcessOrderAsync(OrderRequest request)
        {
            if (request.OrderItemRequests == null || request.OrderItemRequests.Count == 0)
            {
                throw new InvalidOrderException("Product requests list can not be empty");
            }
           
            await Task.WhenAll(request.OrderItemRequests.Select(async orderItem =>
            {
                var productId = orderItem.ProductId;
                var product = await _dbContext.Products.FindAsync(productId) ?? throw new ProductNotFoundException($"Product with ID {productId} not Found");
            }));

            await Task.WhenAll(request.OrderItemRequests.Select(async orderItem =>
            {
                var productId = orderItem.ProductId;
                var product = await _dbContext.Products.FindAsync(productId);
                var quantityInStock = product?.Quantity;
                var quantityRequested = orderItem.Quantity;
                if (quantityInStock < quantityRequested)
                {
                    throw new InvalidOrderException($"Not sufficient stock for {productId}");
                }
            }));

            var order = new Order
            {
                Id = new Guid(),
                OrderDate = DateTime.Now,
            };
            await Task.WhenAll(request.OrderItemRequests.Select(async orderItem =>
            {
                var product = await _dbContext.Products.FindAsync(orderItem.ProductId);
                var quantityRequested = orderItem.Quantity;
                var tax = _taxService.CalculateTax(product, quantityRequested);
                var newOrderItem = CreateOrderItem(product, quantityRequested, tax, order);
                order.Items.Add(newOrderItem);
                order.Total += newOrderItem.SubTotal;
            }));

            /*foreach (var orderItem in request.OrderItemRequests)
            {
                var productId = orderItem.ProductId;
                var product = await _dbContext.Products.FindAsync(productId);
                if (product == null)
                {
                    throw new Exception($"Product with ID {productId} not Found");
                }

                var quantity = orderItem.Quantity;
                if (product.Quantity < quantity)
                {
                    throw new Exception($"Insufficient stock for Product {productId}");
                }
                var tax = _taxService.CalculateTax(product, quantity);
                var newOrderItem = CreateOrderItem(product, quantity, tax, order);
                order.Items.Add(newOrderItem);
                order.Total += newOrderItem.SubTotal;              
            }*/

            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();

            var response = CreateResponse(order);
            return response;
        }

        private static OrderItem CreateOrderItem(Product product, int quantity, decimal tax, Order order)
        {
            return new OrderItem
            {
                Id = new Guid(),
                Quantity = quantity,
                Tax = tax,
                SubTotal = (product.Price * quantity) + tax,
                Product = product,
                Order = order
            };
        }

        private OrderResponse CreateResponse(Order order)
        {
            var response = new OrderResponse
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
            };
            foreach (var orderItem in order.Items)
            {
                var orderItemResponse = CreateOrderItemResponse(orderItem);
                response.OrderItems.Add(orderItemResponse);
                response.Total += orderItemResponse.SubTotal;
            }
            return response;
        }

        private OrderItemResponse CreateOrderItemResponse(OrderItem orderItem)
        {
            var quantity = orderItem.Quantity;
            var tax = orderItem.Tax;
            var product = orderItem.Product;
            return new OrderItemResponse
            {
                Name = product.Name,
                Category = product.Category.ToString(),
                IsImported = product.IsImported,
                Price = product.Price,
                Quantity = quantity,
                Tax = tax,
                SubTotal = orderItem.SubTotal,
            };
        }
    }
}
