import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../dtos/product.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: ProductDto[] = [];
  total: number = 0;
  isCartEmpty = true;

  constructor(private orderService: OrderService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
    const items = this.cartService.getCartItems();
    this.cartItems = items;
    this.total = this.cartService.getTotal();
    this.isCartEmpty = items.length === 0;
  }

  onQuantityChange(cartItem: ProductDto) {
    this.cartService.updateCart(cartItem);
    this.loadCart();
  }

  onSubmitOrder(): void {
    this.orderService.submitOrder(this.cartItems).subscribe({
      next: (response) => {
        this.cartService.emptyCart();
        this.router.navigate(['/receipt'], { 
          state: { data: response } 
        });
      },
      error: err => console.error("Error submitting order", err)
    });
  }

  removeItem(cartItem: ProductDto) {
    this.cartService.removeItemFromCart(cartItem);
    this.loadCart();
  }
}
