import { Injectable } from '@angular/core';
import { ProductDto } from '../dtos/product.dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 private cartItems: ProductDto[] = [];

  addToCart(product: ProductDto): void {
    localStorage.setItem(product.id, JSON.stringify(product));
  }

  getCartItems(): ProductDto[] {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key != null) {
          if (!this.cartItems.find(ci => ci.id == key)) {
            let cartItem: ProductDto = JSON.parse(localStorage.getItem(key)!);
            this.cartItems.push(cartItem);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching local storage");
      throw new Error("Error fetching local storage");
    }
    return this.cartItems;
  }

  updateQuantity(cartItem: ProductDto){
    const productId = cartItem.id;
    let product: ProductDto = JSON.parse(localStorage.getItem(productId)!);
    product.quantityOrdered = cartItem.quantityOrdered;
    localStorage.setItem(productId, JSON.stringify(product));
  }

  removeItemFromCart(cartItem: ProductDto) {
    localStorage.removeItem(cartItem.id);
  }

  updateSubtotal(cartItem: ProductDto){
    const productId = cartItem.id;
    let product: ProductDto = JSON.parse(localStorage.getItem(productId)!);
    const quantityOrdered = cartItem.quantityOrdered;
    const itemPrice = cartItem.price;
    product.subTotal = quantityOrdered * itemPrice;
    localStorage.setItem(productId, JSON.stringify(product));
  }
  getTotal(): number {
    let total =0;
    for(let i =0; i<this.cartItems.length; i++){
      total = total + this.cartItems[i].subTotal;
    }
    return total;
  }
}
