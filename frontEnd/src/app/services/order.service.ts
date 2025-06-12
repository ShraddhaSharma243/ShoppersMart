import { Injectable } from '@angular/core';
import { error } from 'console';
import { OrderRequestDto } from '../dtos/orderRequest.dto';
import { mapToOrderRequestDto } from '../mappers/orderRequest.mapper';
import { ProductDto } from '../dtos/product.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = "https://localhost:7049/api/Order";

  constructor(private http: HttpClient) { }

  submitOrder(cartItems: ProductDto[]): Observable<any> {
    if (!cartItems?.length) {
      console.error("Cart is empty");
    }

    const orderItemRequests = cartItems.map(item => mapToOrderRequestDto(item));

    const body = {
      orderItemRequests: orderItemRequests.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };
    
    return this.http.post(this.apiUrl, body);
  }
}
