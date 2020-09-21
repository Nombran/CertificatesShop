import { Component, OnInit } from '@angular/core'
import { OrderService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/models/order'

@Component({
    selector: 'past-orders-page',
    templateUrl: 'past-orders.component.html',
    styleUrls: ['past-orders.component.scss']
})
export class PastOrdersPageComponent implements OnInit{
    pastOrders: Order[];
    nextPageLink: string;

    constructor(
        private orderService: OrderService
    ) {
    }

    ngOnInit(): void {
        this.orderService.getUserOrders().subscribe(
            (response) => {
                if(response._embedded) {
                    this.pastOrders = response._embedded.orderDtoList;
                    if(response._links.next) {
                        this.nextPageLink = response._links.next;
                    }
                }
            },
            (error) => {}
        )
    }
}