import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router';
import {Certificate} from '../../../../models/certificate';
import {CertificateCardComponent} from '../../components/certificate-card/certificate-card.component'
import {AuthenticationService} from '../../../../core/services/authentication.service';
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
export class ItemDetailsPageComponent{
  certificateData: Certificate;
  user: User;
  @ViewChild(CertificateCardComponent) card: CertificateCardComponent;
  authState: Observable<any>;
  storeUser: User;
  developer: User;
  inProgress: string = "IN_PROGRESS";
  isButtonVisible: boolean = true;


  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private certificateService: CertificateService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.authState = this.store.select(selectAuthState);
    this.authState.subscribe((state) => {
      this.storeUser = state.user;
    })
    this.route.paramMap.subscribe(
      (params => {
        const certificateId = Number(params.get('id'));
        this.certificateService.findById(certificateId).subscribe(
          (response: Certificate) => {
            this.certificateData = response
            if (this.certificateData.desiredDevelopers.find(user=>user.id === this.storeUser.id)) {
              console.log('if')
              this.isButtonVisible = false;
            }
            console.log(this.certificateData)
            this.authenticationService.findUser(this.certificateData.creatorId).subscribe(
              (response: User) => {
                this.user = response
                console.log(this.user)
              },
              (error) => {
                this.router.navigateByUrl('/certificates')
              }
            )
          },
          (error) => {
            this.router.navigateByUrl('/certificates')
          }
        )
      })
    );


    this.authState = this.store.select(selectAuthState);

  }
  approve () {
    this.certificateService.addDesiredDev(this.storeUser.id, this.certificateData.id).subscribe(
      (response: Response) => {
        this.certificateData.desiredDevelopers.push(this.storeUser)
        this.isButtonVisible = false;
      }
    )
  }
  cancel (userId) {
    this.certificateService.deleteDesiredDev(userId, this.certificateData.id).subscribe(
      (response: Response) => {
        this.certificateData.desiredDevelopers = this.certificateData.desiredDevelopers.filter(user => user.id !== this.storeUser.id)
        this.isButtonVisible = true;
      }
    )
  }
  cancelProcessing () {
    this.certificateService. cancelProcessing(this.certificateData.id).subscribe(
      (response: Response) => {
      }
    )
  }
  approveUser (id) {
    this.certificateService.addDevelop(id, this.certificateData.id).subscribe(
      (response: Response) => {

      }
    )
  }
}
