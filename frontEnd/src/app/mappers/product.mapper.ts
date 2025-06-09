import { ProductDto } from "../dtos/product.dto";
import { CartService } from "../services/cart.service";

export function mapToProductDto(products: any[], cartService: CartService): ProductDto[] {
    return products.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        isImported: product.isImported ? 'Yes' : 'No',
        price: product.price,
        quantityInStock: product.quantity,
        quantityOrdered:1,
        subTotal:0,
        isAddedToTheCart: cartService.getCartItems().some(item => item.id === product.id)
    }))
}