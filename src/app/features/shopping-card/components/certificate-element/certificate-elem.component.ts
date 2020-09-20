import { Component, Input, Output } from '@angular/core'
import { Certificate } from 'src/app/models/certificate'
import { EventEmitter } from '@angular/core'
import { VirtualTimeScheduler } from 'rxjs';

@Component({
    selector: 'certificate-in-card',
    templateUrl: './certificate-elem.component.html',
    styleUrls: ['./certificate-elem.component.scss']
})
export class CertificateElementComponent {
    @Input() certificate: Certificate;
    @Output() removeCertificate: EventEmitter<any> = new EventEmitter<any>();
    @Output() addCertificate: EventEmitter<any> = new EventEmitter<any>();

    add() {
        this.addCertificate.emit({certificate: this.certificate});
    }

    remove() {
        this.removeCertificate.emit({certificate: this.certificate});
    }
}