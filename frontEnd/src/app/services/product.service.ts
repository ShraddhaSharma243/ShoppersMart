import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { NewProductRequestDto } from '../dtos/newProductRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7049/api/Product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
      return this.http.get(this.apiUrl).pipe(
        map((response: any) => response.products || []),
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching products:', error);
          return throwError(() => 'Failed to fetch products. Please try again later.');
        })
      );
  }
  
  submit(newProductRequest: NewProductRequestDto) {
  const apiUrl = "https://localhost:7049/api/Product/AddProduct";
    
    const body = {
      name: newProductRequest.name,
      category: newProductRequest.category,
      isImported: newProductRequest.isImported,
      price: newProductRequest.price,
      quantityInStock: newProductRequest.quantityInStock
    }

    return this.http.post(apiUrl, body).pipe(
      map(() => { }),
      catchError((httpErrorResponse: HttpErrorResponse) => {
        return throwError(() => httpErrorResponse.error || 'An unknown error ocured while submitting the product');
      })
    );
  }
}
