import { Injectable } from "@angular/core";
import { Product } from "./product";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private productUrl = 'api/products/products.json';//To proper web server

    private productsUrl = 'api/products';
    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getProduct(id: number): Observable<Product> {
        if (id === 0) {
            return of(this.initializeProduct());
        }
        const url = `${this.productsUrl}/${id}`;
        return this.http.get<Product>(url)
            .pipe(
                tap(data => console.log('getProduct: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }
    createProduct(product: Product): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        product.id = null;
        return this.http.post<Product>(this.productsUrl, product, { headers: headers })
            .pipe(
                tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteProduct(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete<Product>(url, { headers: headers })
            .pipe(
                tap(data => console.log('deleteProduct: ' + id)),
                catchError(this.handleError)
            );
    }

    updateProduct(product: Product): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${product.id}`;
        return this.http.put<Product>(url, product, { headers: headers })
            .pipe(
                tap(() => console.log('updateProduct: ' + product.id)),
                // Return the product on an update
                map(() => product),
                catchError(this.handleError)
            );
    }


    private handleError(err: HttpErrorResponse) {

        let errorMessage = '';

        if (err.error instanceof ErrorEvent) {
            //a client-side or network error occurred
            errorMessage = `An error occurred: ${err.error.message}`;
        }
        else {
            //backend returned an unsuccessful response code
            errorMessage = `Server returned code: ${err.status} , error message is: $err.message`;
        }

        console.log(errorMessage);
        return throwError(errorMessage);
    }

    private initializeProduct(): Product {
        // Return an initialized object
        return {
            id: 0,
            productName: null,
            productCode: null,
            tags: [''],
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null
        };
    }

}