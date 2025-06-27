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
      throw new Error(`Error fetching local storage: ${error instanceof Error ? error.message : error}`);
    }
    return cartItems;
  }

  private roundToTwo(num: number): number {
    return Math.round(num * 100) / 100;
  }

  updateCart(cartItem: ProductDto) {
    const productId = cartItem.id;
    const existingItem = localStorage.getItem(productId);
    if (existingItem) {
      const quantity = Number(cartItem.quantityOrdered);
      const price = Number(cartItem.price);
      if (isNaN(quantity) || isNaN(price)) {
        cartItem.subTotal = 0;
      } else {
        cartItem.subTotal = this.roundToTwo(quantity * price);
      }
      localStorage.setItem(productId, JSON.stringify(cartItem));
    }
  }
    
  removeItemFromCart(cartItem: ProductDto) {
    localStorage.removeItem(cartItem.id);
  }

  getTotal(): number {
    return this.roundToTwo(this.getCartItems().reduce((total, item) => total + item.subTotal, 0));
  }
}
