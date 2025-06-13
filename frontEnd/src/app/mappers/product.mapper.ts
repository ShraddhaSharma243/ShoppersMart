import { ProductDto } from "../dtos/product.dto";
import { CartService } from "../services/cart.service";

export function mapToProductDto(products: any[], cartService: CartService): ProductDto[] {
    return products.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        isImported: product.isImported ? 'Yes' : 'No',
        price: product.price,
        quantityInStock: product.quantityInStock,
        quantityOrdered: 1,
        subTotal: product.price,
        isAddedToTheCart: cartService.getCartItems().some(item => item.id === product.id),
        isProductInStock: product.quantityInStock > 0 ? true : false,
        addToCartBttnText: product.quantityInStock > 0 ? "Add to Cart" : "Out of stock"
    }))
}