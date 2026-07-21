import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private httpClient: HttpClient) { }

    getOrders(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(
            environment.getCrudApiUrl + "/Orders/getall"
        );
    }

    getOrderById(id: number): Observable<Order> {
        return this.httpClient.get<Order>(
            environment.getCrudApiUrl + "/Orders/getbyid?id=" + id
        );
    }

    add(order: Order): Observable<string> {
        return this.httpClient.post(
            environment.getCrudApiUrl + "/Orders",
            order,
            { responseType: "text" }
        );
    }

    update(order: Order): Observable<string> {
        return this.httpClient.put(
            environment.getCrudApiUrl + "/Orders",
            order,
            { responseType: "text" }
        );
    }

    delete(id: number): Observable<string> {
        return this.httpClient.request(
            "delete",
            environment.getCrudApiUrl + "/Orders",
            {
                body: { id: id },
                responseType: "text"
            }
        );
    }
}