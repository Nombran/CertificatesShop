import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router';
import {Certificate} from '../../../../models/certificate';
import {CertificateCardComponent} from '../../components/certificate-card/certificate-card.component'
import {CertificateService} from '../../../../core/services/certificates.service'
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState, selectAuthState} from "../../../../store/app.states";
import {User} from "../../../../models/user";


@Component({
  selector: 'item-details-page',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsPageComponent implements AfterViewChecked {
  certificateData: Certificate;
  @ViewChild(CertificateCardComponent) card: CertificateCardComponent;
  authState: Observable<any>;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private certificateService: CertificateService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.authState = this.store.select(selectAuthState);
    this.route.paramMap.subscribe(
      (params => {
        const certificateId = Number(params.get('id'));
        this.certificateService.findById(certificateId).subscribe(
          (response: Certificate) => {
            this.certificateData = response
          },
          (error) => {
            this.router.navigateByUrl('/certificates')
          }
        )
      })
    );
  }

  ngAfterViewChecked(): void {
    if (this.card) {
      this.card.showComponent();
    }
    this.authState.subscribe((state) => {
      if (state.user) {
        this.user = state.user;
      }
    });
  }
}
