// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListDataService {
  // private apiUrl = 'https://localhost:7049/api/Product';
  private mockProducts = {
    products: [
      {
        id: 1,
        name: 'Laptop',
        category: 'Electronics',
        description: 'A powerful gaming laptop',
        price: 1200,
        quantity: 10
      },
      {
        id: 2,
        name: 'Smartphone',
        category: 'Electronics',
        description: 'A latest model smartphone',
        price: 800,
        quantity: 25
      },
      {
        id: 3,
        name: 'Wireless Headphones',
        category: 'Electronics',
        description: 'Noise-cancelling headphones',
        price: 150,
        quantity: 50
      },
      {
        id: 4,
        name: 'Smartwatch',
        category: 'Electronics',
        description: 'Water-resistant fitness smartwatch',
        price: 200,
        quantity: 18
      },
      {
        id: 5,
        name: 'Bluetooth Speaker',
        category: 'Electronics',
        description: 'High-quality portable speaker',
        price: 99,
        quantity: 30
      }
    ]
  };

  // constructor(private http: HttpClient) {
  // }

  getProducts(): Observable<any> {
    // return this.http.get(this.apiUrl);
    return of(this.mockProducts);
  }
}
