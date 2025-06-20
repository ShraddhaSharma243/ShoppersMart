import { Injectable } from '@angular/core';
import { ProductDto } from '../dtos/product.dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  emptyCart() {
    localStorage.clear();
  }

  addToCart(product: ProductDto): void {
    product.isAddedToTheCart = true;
    localStorage.setItem(product.id, JSON.stringify(product));
  }

  getCartItems(): ProductDto[] {
    let cartItems: ProductDto[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key != null) {
          let cartItem: ProductDto = JSON.parse(localStorage.getItem(key)!);
          cartItems.push(cartItem);
        }
      }
    } catch (error) {
      console.error("Error fetching local storage");
      throw new Error("Error fetching local storage");
    }
    return cartItems;
  }

  updateCart(cartItem: ProductDto) {
    const productId = cartItem.id;
    const existingItem = localStorage.getItem(productId);
    if (existingItem) {
      cartItem.subTotal = Math.round(cartItem.quantityOrdered * cartItem.price * 100) / 100;
      localStorage.setItem(productId, JSON.stringify(cartItem));
    }
  }

  removeItemFromCart(cartItem: ProductDto) {
    localStorage.removeItem(cartItem.id);
  }

  getTotal(): number {
    return Math.round(this.getCartItems().reduce((total, item) => total + item.subTotal, 0) *100)/100;
  }
}
