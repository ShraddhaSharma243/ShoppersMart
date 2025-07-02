import { HttpClient, HttpErrorResponse } from "@angular/common/http";
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
            catchError(error => {
                console.error('Error fetching categories: ', error);
                return throwError(() => error);
            })
        );
    }

    submit(newCategoryRequest: NewCategoryRequestDto): Observable<void> {     
        if (!newCategoryRequest || !newCategoryRequest.name) {
            return throwError(() => new Error('Invalid category request'));
        }
        const apiUrl = "https://localhost:7049/api/Category/AddCategory";

        const body = {
            name: newCategoryRequest.name
        }
        return this.http.post(apiUrl, body).pipe(
            map(() => { }),
            catchError((httpErrorResponse: HttpErrorResponse) => {
                return throwError(() => httpErrorResponse.error || 'An unknown error occurred while submitting the category');
            })
        );
    }
}