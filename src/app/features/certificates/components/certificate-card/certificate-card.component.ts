import { Component, Input, OnInit } from '@angular/core'
import { AppState, selectAuthState } from '../../../../store/app.states';
import { Store } from '@ngrx/store';
import { Certificate } from '../../../../models/certificate'
import { Observable } from 'rxjs';
import { JwtTokenService } from 'src/app/core/services/jwt-token.service';
import { Router } from '@angular/router';
import { CertificateService } from 'src/app/core/services/certificates.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';



@Component({
    selector: 'certificate-card',
    templateUrl: 'certificate-card.component.html',
    styleUrls: ['certificate-card.component.scss']
})
export class CertificateCardComponent implements OnInit {
    @Input() certificateData: Certificate;
    opacity: number = 0;
    authState: Observable<any>;
    role: string;
    userId: number;

    constructor(private store: Store<AppState>,
        private tokenService: JwtTokenService,
        private router: Router,
        private certificateService: CertificateService,
        private _snackBar: MatSnackBar) {
        this.authState = this.store.select(selectAuthState);
    }

    ngOnInit(): void {
        const token: string = this.tokenService.getToken();
        if (token) {
            const decodedToken = this.tokenService.decodeToken(token);
            this.role = decodedToken.roles.toString();
        }
        this.authState.subscribe(state => {
            if (state.user) {
                this.userId = state.user.id;
            }
        });
    }

    showComponent() {
        let timerId = setInterval(() => {
            if (this.opacity >= 1) {
                clearInterval(timerId);
            }
            this.opacity += 0.1;
        }, 20);
    }

    onEdit(certificate: Certificate) {
        const url = 'certificates/' + certificate.id + "/edit";
        this.router.navigateByUrl(url);
    }

    addToCard() {
        this.certificateService.addCertificateToCard(this.certificateData, this.userId);
        let config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-success'];
        config.duration = 3000;
        this._snackBar.open("Certificate added to shopping card!", null, config);
    }

    certificateClick(): void {
        const url = "certificates/" + this.certificateData.id + "/details";
        this.router.navigateByUrl(url);
    }
}