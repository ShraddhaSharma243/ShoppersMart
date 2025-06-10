import { Component, OnInit } from '@angular/core';
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
export class CartComponent implements OnInit {

  cartItems: ProductDto[] = [];
  total: number = 0;

  constructor(private receiptService: ReceiptService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  onQuantityOrderedChange(cartItem: ProductDto) {
    this.cartService.updateCart(cartItem);
    this.loadCart();
  }

  requestReceipt(): void {
    this.receiptService.requestReceipt(this.cartItems);
  }

  removeItemFromCart(cartItem: ProductDto) {
    this.cartService.removeItemFromCart(cartItem);
    this.loadCart();
  }
}
