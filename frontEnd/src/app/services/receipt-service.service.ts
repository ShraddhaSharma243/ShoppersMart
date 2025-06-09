import { Injectable } from '@angular/core';
import { error } from 'console';
import { ReceiptRequestDto } from '../dtos/receiptRequest.dto';
import { mapToReceiptRequestDto } from '../mappers/receiptRequest.mapper';
import { ProductDto } from '../dtos/product.dto';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  receiptRequest: ReceiptRequestDto[] = [];

  requestReceipt(cartItems: ProductDto[]) {
    if (cartItems.length == 0) {
      console.error("Cart is empty");
    }

    for (let i = 0; i < cartItems.length; i++) {
      this.receiptRequest.push(mapToReceiptRequestDto(cartItems[i]));
    }
    console.log(this.receiptRequest);
  }
}
