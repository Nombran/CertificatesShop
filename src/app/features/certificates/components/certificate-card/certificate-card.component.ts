import { Component, Input, OnInit } from '@angular/core'
import { AppState, selectAuthState } from '../../../../store/app.states';
import { Store } from '@ngrx/store';
import { Certificate } from '../../../../models/certificate'
import { Observable } from 'rxjs';
import { JwtTokenService } from 'src/app/core/services/jwt-token.service';
import { Router } from '@angular/router';


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

    constructor(private store: Store<AppState>,
        private tokenService: JwtTokenService,
        private router: Router) {
        this.authState = this.store.select(selectAuthState);
    }

    ngOnInit(): void {
        const token: string = this.tokenService.getToken();
        if (token) {
            const decodedToken = this.tokenService.decodeToken(token);
            this.role = decodedToken.roles.toString();
        }
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
}