import { HttpClient } from "@angular/common/http";
import { NewCategoryRequestDto } from "../dtos/newCategoryRequest.dto";
import { catchError, map, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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

    submitCategory(newCategoryRequest: NewCategoryRequestDto) {
        if (!newCategoryRequest || !newCategoryRequest.name) {
            return throwError(() => new Error('Invalid category request'));
        }
        const name = newCategoryRequest.name.trim();
        const apiUrl = "https://localhost:7049/api/Category/AddCategory";

        const body = {
            name: newCategoryRequest.name
        }
        return this.http.post(apiUrl, body).pipe(
            map(() => { }),
            catchError(error => {
                console.error('Error submitting category: ', error);
                return throwError(() => error);
            })
        );
    }
}