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
            ValidateOrderRequest(request);

            var orderedProducts = await LoadOrderedProdutsAsync(request);

            ValidateProductStock(request, orderedProducts);

            Order order = CreateOrder(request, orderedProducts);

            await SaveOrderAsync(order);

            await UpdateStock(request);

            return CreateResponse(order);

        }

        private async Task UpdateStock(OrderRequest request)
        {
            var orderItemsRequest = request.Items;
            if (orderItemsRequest == null)
            {
                throw new ArgumentNullException(nameof(orderItemsRequest));
            }
           foreach(var orderItemRequest in orderItemsRequest)
            {
                UpdateProductStockQuantity(orderItemRequest);
            }
            await _dbContext.SaveChangesAsync();
        }

        private void UpdateProductStockQuantity(Dtos.Order.OrderItem orderItemRequest)
        {
            var productId = orderItemRequest.ProductId;
            var product = _dbContext.Products.Find(productId);
            product.QuantityInStock = product.QuantityInStock - orderItemRequest.Quantity;
            _dbContext.Products.Update(product);
        }

        private async Task SaveOrderAsync(Order order)
        {
            _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();
        }

        private Order CreateOrder(OrderRequest request, Dictionary<Guid, Product> orderedProducts)
        {
            var order = new Order
            {
                Id = Guid.NewGuid(),
                OrderDate = DateTime.UtcNow,
                Items = new List<Entities.OrderItem>(),
                Total = 0
            };

            foreach (var orderItem in request.Items)
            {
                var product = orderedProducts[orderItem.ProductId];
                var tax = _taxService.CalculateTax(product, orderItem.Quantity);
                var newOrderItem = CreateOrderItem(product, orderItem.Quantity, tax, order);
                order.Items.Add(newOrderItem);
                order.Total += newOrderItem.SubTotal;
            }

            return order;
        }

        private static void ValidateProductStock(OrderRequest request, Dictionary<Guid, Product> products)
        {
            foreach (var orderItem in request.Items)
            {
                if (!products.TryGetValue(orderItem.ProductId, out var product))
                {
                    throw new ProductNotFoundException($"Product with ID {orderItem.ProductId} not found");
                }

                if (product.QuantityInStock < orderItem.Quantity)
                {
                    throw new InvalidOrderException($"Not sufficient stock for product ID {orderItem.ProductId}");
                }
            }
        }

        private async Task<Dictionary<Guid, Product>> LoadOrderedProdutsAsync(OrderRequest request)
        {
            var orderedProductsIds = request.Items.Select(orderItem => orderItem.ProductId).Distinct().ToList();
            var orderedProducts = await _dbContext.Products
                        .Where(p => orderedProductsIds.Contains(p.Id))
                        .ToDictionaryAsync(p => p.Id);
            return orderedProducts;
        }

        private static void ValidateOrderRequest(OrderRequest request)
        {
            if (request.Items == null || request.Items.Count == 0)
            {
                throw new InvalidOrderException("Product requests list cannot be empty");
            }
        }

        private static Entities.OrderItem CreateOrderItem(Product product, int quantity, decimal tax, Order order)
        {
            return new Entities.OrderItem
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

        private OrderItemResponse CreateOrderItemResponse(Entities.OrderItem orderItem)
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
