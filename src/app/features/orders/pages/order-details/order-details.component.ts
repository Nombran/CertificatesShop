import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { CertificateService } from 'src/app/core/services/certificates.service';
import { OrderService } from 'src/app/core/services/order.service';
import { Certificate } from '../../../../models/certificate'
import { Order } from '../../../../models/order'

@Component({
    selector: 'order-details-page',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsPageComponent implements OnInit {
    order: Order;
    certificates: Certificate[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private certificateService: CertificateService,
        private orderService: OrderService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            (params => {
                const orderId = Number(params.get('id'));
                this.orderService.findById(orderId).subscribe(
                    (response: Order) => {
                        this.order = response;
                        Array.prototype.forEach.call(this.order.certificatesIds, (id: number) => {
                            this.certificateService.findById(id).subscribe(
                                (response: Certificate) => {
                                    let certificate = this.certificates.find(elem => elem.id == id);
                                    if (certificate) {
                                        certificate.count++;
                                    } else {
                                        response.count = 1;
                                        this.certificates.push(response);
                                    }
                                },
                                (error) => { }
                            )
                        });
                    },
                    (error) => {
                        this.router.navigateByUrl('/certificates')
                    }
                )
            })
        );
    }

    back(): void {
        const url = "/orders";
        this.router.navigateByUrl(url);
    }
}