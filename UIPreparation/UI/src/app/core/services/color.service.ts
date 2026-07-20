import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { environment } from 'environments/environment';

@Injectable({
    providedIn:'root'
})
export class ColorService {

    constructor(private httpClient:HttpClient) { }

    getColors(): Observable<Color[]> {
        return this.httpClient.get<Color[]>(
            environment.getCrudApiUrl+"/Colors/getall"
        );
    }

    getColorById(id: number): Observable<Color> {
        return this.httpClient.get<Color>(
            environment.getCrudApiUrl+"/Colors/getbyid?id="+id
        );
    }

    add(color: Color): Observable<string> {
        return this.httpClient.post(
            environment.getCrudApiUrl+"/Colors",
            color,
            {responseType:"text"}
        );
    }

    update(color: Color): Observable<string> {
        return this.httpClient.put(
            environment.getCrudApiUrl+"/Colors",
            color,
            {responseType:"text"}
        );
    }

    delete(id: number): Observable<string> {
        return this.httpClient.request(
            "delete",
            environment.getCrudApiUrl+"/Colors",
            {
                body: { id: id },
                responseType:"text"
            }
        );
    }
}