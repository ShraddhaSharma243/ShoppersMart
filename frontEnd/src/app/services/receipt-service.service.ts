import { Injectable } from '@angular/core';
import { error } from 'console';
import { ReceiptRequestDto } from '../dtos/receiptRequest.dto';
import { mapToReceiptRequestDto } from '../mappers/receiptRequest.mapper';
import { ProductDto } from '../dtos/product.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  apiUrl = "https://localhost:7049/api/Order";

  constructor(private http: HttpClient) { }

  requestReceipt(cartItems: ProductDto[]): Observable<any> {
    if (!cartItems?.length) {
      console.error("Cart is empty");
    }

    const orderItemRequests = cartItems.map(item => mapToReceiptRequestDto(item));

    const body = {
      orderItemRequests: orderItemRequests.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };
    
    return this.http.post(this.apiUrl, body);
  }
}
