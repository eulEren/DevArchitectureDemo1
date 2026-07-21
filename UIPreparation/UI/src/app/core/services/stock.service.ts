import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StockService {

    constructor(private httpClient: HttpClient) { }

    getStocks(): Observable<Stock[]> {
        return this.httpClient.get<Stock[]>(
            environment.getCrudApiUrl + "/Stocks/getall"
        );
    }

    getStockById(id: number): Observable<Stock> {
        return this.httpClient.get<Stock>(
            environment.getCrudApiUrl + "/Stocks/getbyid?id=" + id
        );
    }

    add(stock: Stock): Observable<string> {
        return this.httpClient.post(
            environment.getCrudApiUrl + "/Stocks",
            stock,
            { responseType: "text" }
        );
    }

    update(stock: Stock): Observable<string> {
        return this.httpClient.put(
            environment.getCrudApiUrl + "/Stocks",
            stock,
            { responseType: "text" }
        );
    }

    delete(id: number): Observable<string> {
        return this.httpClient.request(
            "delete",
            environment.getCrudApiUrl + "/Stocks",
            {
                body: { id: id },
                responseType: "text"
            }
        );
    }
}