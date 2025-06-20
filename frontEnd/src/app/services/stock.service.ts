import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { mapTostockItemRequestDto } from '../mappers/stockItemRequest.mapper';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { StockRequestDto } from '../dtos/stockRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  apiUrl = "https://localhost:7049/api/StockEntry";

  constructor(private http: HttpClient) { }

  submit(stockItemRequest: StockRequestDto) {
    
    const body = {
      name: stockItemRequest.name,
      category: stockItemRequest.category,
      isImported: stockItemRequest.isImported,
      price: stockItemRequest.price,
      quantityInStock: stockItemRequest.quantityInStock
    }

    return this.http.post(this.apiUrl, body).pipe(
      map(() => { }),
      catchError(error => {
        console.error('Error submitting entry : ', error);
        return throwError(() => error);
      })
    );
  }
}
