import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Certificate } from '../../../../models/certificate'
import { switchMap, tap } from 'rxjs/operators'
import { CertificateService } from '../../../../core/services/certificates.service'

@Component({
    selector: 'edit-certificate-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditCertificatePageComponent implements OnInit {
    certificate: Certificate;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private certificateService: CertificateService) {
        this.route.paramMap.subscribe(
            (params => {
                const certificateId = Number(params.get('id'));
                this.certificateService.findById(certificateId).subscribe(
                    (response: Certificate) => { this.certificate = response },
                    (error) => { this.router.navigateByUrl('/certificates') }
                )
            })
        );
    }

    ngOnInit(): void {
    }

}