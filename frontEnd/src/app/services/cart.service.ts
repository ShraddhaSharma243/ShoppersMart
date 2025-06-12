import { Injectable } from '@angular/core';
import { ProductDto } from '../dtos/product.dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartStorageKey = 'cart'
  cart: ProductDto[] = [];

  constructor() {
    const storedCart = localStorage.getItem(this.cartStorageKey);
    this.cart = storedCart ? JSON.parse(storedCart) : [];
  }

  get Cart(): ProductDto[] {
    return this.cart;
  }

  get Total(): number {
    return this.cart.reduce(
      (total, item) => total + item.subTotal,
      0);
  }

  addToCart(product: ProductDto) {
    this.cart.push(
      {
        ...product,
        quantityOrdered: 1,
        quantityInStock: --product.quantityInStock
      });

    this.saveCart();
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter(p => p.id !== productId);
    this.saveCart();
  }

  changeQuantity(productId: string, delta: number) {
    const item = this.cart.find(p => p.id === productId);

    if (item) {
      if (item.quantityInStock === 0 && delta > 0) {
        alert('Not enough in stock');
        return;
      }

      item.quantityOrdered += delta;
      item.quantityInStock -= delta;

      if (item.quantityOrdered <= 0) {
        this.removeFromCart(productId);
      }

      item.subTotal = item.quantityOrdered * item.price;
    }

    this.saveCart();
  }

  private preventOverOrdering(product: ProductDto, quantityOrdered: number) {
    if (product.quantityInStock === 0 && quantityOrdered > 0) {
      alert('Not enough in stock');
      return;
    }
  }

  private saveCart() {
    localStorage.setItem(this.cartStorageKey, JSON.stringify(this.cart));
  }
}
