import { Component, Input, OnInit } from '@angular/core'
import { Certificate } from '../../../../models/certificate'



@Component({
    selector: 'certificate-card',
    templateUrl: 'certificate-card.component.html',
    styleUrls: ['certificate-card.component.scss']
})
export class CertificateCardComponent {
    @Input() certificateData: Certificate;
    opacity: number = 0;

    showComponent() {
        let timerId = setInterval(() => {
            if (this.opacity >= 1) {
                clearInterval(timerId);
            }
            this.opacity += 0.1;
        }, 20);
    }
}