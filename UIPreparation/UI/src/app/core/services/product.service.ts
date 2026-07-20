import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private httpClient: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(
            environment.getCrudApiUrl + '/Products/getall'
        );
    }

    getProductById(id: number): Observable<Product> {
        return this.httpClient.get<Product>(
            environment.getCrudApiUrl + '/Products/getbyid?id=' + id
        );
    }

    add(product: Product): Observable<string> {
        return this.httpClient.post(
            environment.getCrudApiUrl + '/Products',
            product,
            { responseType: 'text' }
        );
    }

    update(product: Product): Observable<string> {
        return this.httpClient.put(
            environment.getCrudApiUrl + '/Products',
            product,
            { responseType: 'text' }
        );
    }

    delete(id: number): Observable<string> {
        return this.httpClient.request(
            'delete',
            environment.getCrudApiUrl + '/Products',
            {
                body: { id: id },
                responseType: 'text'
            }
        );
    }

}