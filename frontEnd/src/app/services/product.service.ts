import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7049/api/Product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
