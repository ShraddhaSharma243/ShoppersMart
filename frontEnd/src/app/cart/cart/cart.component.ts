import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductDto } from '../../dtos/product.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReceiptService } from '../../services/receipt-service.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnChanges {

  @Input() cartItems: ProductDto[] = [];
  @Input() total: number = 0;

  constructor(private receiptService: ReceiptService,
    private cartService: CartService,
    private router: Router,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cartItems']) {
      console.log("ngOnChanges");
    }
  }

  onQuantityOrderedChange(cartItem: ProductDto) {
    this.cartService.updateQuantity(cartItem);
    this.cartService.updateSubtotal(cartItem);
    this.cartItems = [...this.cartService.getCartItems()];
    this.total = this.cartService.getTotal();
    this.cd.detectChanges();
  }

  requestReceipt(): void {
    this.receiptService.requestReceipt(this.cartItems);
  }

  removeItemFromCart(cartItem: ProductDto) {
    this.cartService.removeItemFromCart(cartItem);
    this.cartItems = this.cartItems.filter(item => item.id !== cartItem.id);
  }
}
