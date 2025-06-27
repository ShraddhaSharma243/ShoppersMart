import { Injectable } from '@angular/core';
import { ProductDto } from '../dtos/product.dto';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = "https://localhost:7049/api/Order";

  constructor(private http: HttpClient) { }

  submitOrder(cartItems: ProductDto[]): Observable<any> {
    if (!cartItems?.length) {
      console.error("Cart is empty");
      return EMPTY;
    }

    const body = {
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantityOrdered
      }))
    };
    
    return this.http.post(this.apiUrl, body);
  }
}
