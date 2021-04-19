import { Component, OnInit } from '@angular/core'
import { CertificateService } from 'src/app/core/services/certificates.service';
import { Certificate } from 'src/app/models/certificate'
import { Order } from '../../../../models/order'
import { OrderService } from '../../../../core/services/order.service'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

@Component({
    selector: 'shopping-card-page',
    templateUrl: './shop-card.component.html',
    styleUrls: ['./shop-card.component.scss']
})
export class ShoppingCardPageComponent implements OnInit {
    card: Certificate[] = [];
    totalPrice: number = 0;
    authState: Observable<any>;
    userId: number;

    constructor(private certificateService: CertificateService,
        private orderService: OrderService,
        private _snackBar: MatSnackBar,
        private store: Store<AppState>) {
        this.authState = this.store.select(selectAuthState);
    }

    ngOnInit(): void {
        this.authState.subscribe(state => {
            if (state.user) {
                this.userId = state.user.id;
                this.card = this.certificateService.getCertificateCard(this.userId);
                this.calculateTotalPrice();
            }
        });
    }

    calculateTotalPrice() {
        this.totalPrice = 0;
        Array.prototype.forEach.call(this.card, (certificate: Certificate) => {
            this.totalPrice = Number.parseFloat(this.totalPrice.toFixed(2));
        });
    }

    remove(data): void {
        let certificate: Certificate = data.certificate;
        this.certificateService.removeFromCard(certificate, this.userId);
        this.card = this.certificateService.getCertificateCard(this.userId);
        this.calculateTotalPrice();
    }

    add(data): void {
        let certificate: Certificate = data.certificate;
        this.certificateService.addCertificateToCard(certificate, this.userId);
        this.card = this.certificateService.getCertificateCard(this.userId);
        this.calculateTotalPrice();
    }

    checkout() {
        let order: Order = { certificatesIds: [] }
        this.orderService.createOrder(order).subscribe(
            (respone) => {
                this.certificateService.clearCard(this.userId);
                this.card = [];
                this.toogleSuccessBar('Order created successfully!');
            },
            (error) => {
                this.toggleErrorBar("Error in creating order!");
            }
        );
    }

    toogleSuccessBar(message: string) {
        let config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-success'];
        config.duration = 3000;
        this._snackBar.open(message, null, config);
    }

    toggleErrorBar(message: string) {
        let config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-error'];
        config.duration = 3000;
        this._snackBar.open(message, null, config);
    }
}
