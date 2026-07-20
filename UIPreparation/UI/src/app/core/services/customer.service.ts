import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { environment } from 'environments/environment';

@Injectable({
    providedIn:'root'
})
export class CustomerService {

    constructor(private httpClient:HttpClient) { }

    getCustomers(): Observable<Customer[]> {
        return this.httpClient.get<Customer[]>(
            environment.getCrudApiUrl+"/Customers/getall"
        );
    }

    getCustomerById(id: number): Observable<Customer> {
        return this.httpClient.get<Customer>(
            environment.getCrudApiUrl+"/Customers/getbyid?id="+id
        );
    }

    add(customer: Customer): Observable<string> {
        return this.httpClient.post(
            environment.getCrudApiUrl+"/Customers",
            customer,
            {responseType:"text"}
        );
    }

    update(customer: Customer): Observable<string> {
        return this.httpClient.put(
            environment.getCrudApiUrl+"/Customers",
            customer,
            {responseType:"text"}
        );
    }

    delete(id: number): Observable<string> {
        return this.httpClient.request(
            "delete",
            environment.getCrudApiUrl+"/Customers", 
            {
                body: { id: id },
                responseType:"text"
            }
        );
    }

}