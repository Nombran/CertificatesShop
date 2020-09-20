import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { Order } from '../../models/order'
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class OrderService {
    apiUrl: string = environment.apiUrl + "users/me/orders"

    constructor(private http: HttpClient) {}

    createOrder(order: Order) {
        return this.http.post(this.apiUrl, order);
    }
}