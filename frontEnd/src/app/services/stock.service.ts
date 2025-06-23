import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StockRequestDto } from '../dtos/stockRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

getCategories(): Observable<any> {
  const apiUrl = "https://localhost:7049/api/Category/GetCategories";
  return this.http.get(apiUrl).pipe(
    map((response: any) => response),
    catchError(error => {
      console.error('Error fetching categories: ', error);
      return throwError(() => error);
    })
  );
}

  submit(stockItemRequest: StockRequestDto) {
  const apiUrl = "https://localhost:7049/api/Product/AddProduct";
    
    const body = {
      name: stockItemRequest.name,
      category: stockItemRequest.category,
      isImported: stockItemRequest.isImported,
      price: stockItemRequest.price,
      quantityInStock: stockItemRequest.quantityInStock
    }

    return this.http.post(apiUrl, body).pipe(
      map(() => { }),
      catchError(error => {
        console.error('Error submitting entry : ', error);
        return throwError(() => error);
      })
    );
  }
}
