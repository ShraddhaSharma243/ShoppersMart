import { Component } from '@angular/core';
import { ProductDto } from '../../dtos/product.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReceiptService } from '../../services/receipt-service.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: ProductDto[] = [];
  total: number = 0;

  constructor(
    private receiptService: ReceiptService,
    private cartService: CartService
  ) {
    this.loadCart();
  }

  changeQuantity(productId: string, delta: number) {
    this.cartService.changeQuantity(productId, delta);
    this.loadCart();
  }

  requestReceipt(): void {
    this.receiptService.requestReceipt(this.cart);
  }

  remove(productId: string) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  private loadCart() {
    this.cart = this.cartService.Cart;
    this.total = this.cartService.Total;
  }
}
