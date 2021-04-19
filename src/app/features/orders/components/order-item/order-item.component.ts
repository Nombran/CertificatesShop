import { Component, Input } from '@angular/core'
import { Router } from '@angular/router';
import { Order } from '../../../../models/order'

@Component({
    selector: 'order-item',
    templateUrl: 'order-item.component.html',
    styleUrls: ['order-item.component.scss']
})
export class OrderItemComponent {
    @Input() order: Order;

    constructor(private router: Router) {}

    navigateToDetails(): void {
        const url = '/orders/' + this.order.id + '/details';
        this.router.navigateByUrl(url);
    }
}