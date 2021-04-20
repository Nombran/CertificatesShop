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
import {MatDialog} from "@angular/material/dialog";
import {ReviewData} from "../../../../models/review-data";
import {ReviewDialog} from "../../../../shared/components/dialog/dialog.component";


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
  status: string;
  inProgress: string = "IN_PROGRESS";
  isButtonVisible: boolean = true;
  requests: any
  finishedRequests: Array<Certificate>
  reviewData: ReviewData = {}


  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private certificateService: CertificateService,
    private router: Router,
    private store: Store<AppState>,
    public dialog: MatDialog
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
            if (this.certificateData.status === 'PENDING') this.status = 'Ожидание'
            else if (this.certificateData.status === 'IN_PROGRESS') this.status = 'Выполняется'
            else this.status = 'Завершён'
            if (this.certificateData.desiredDevelopers.find(user=>user.id === this.storeUser.id)) {
              this.isButtonVisible = false;
            }
            console.log(this.certificateData)
            this.authenticationService.findUser(this.certificateData.creatorId).subscribe(
              (response: User) => {
                this.user = response
                console.log(this.user)
                this.authenticationService.findRequests(this.user.id).subscribe(
                  (response) => {
                    this.requests = response
                    this.finishedRequests = this.requests?.createdServices.filter(el=>el.status==='COMPLETED')
                    console.log(this.requests)
                  })
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
    const url = '/orders/' + this.certificateData.id + '/details';
    this.router.navigateByUrl(url);
  }
  cancel (userId) {
    this.certificateService.deleteDesiredDev(userId, this.certificateData.id).subscribe(
      (response: Response) => {
        this.certificateData.desiredDevelopers = this.certificateData.desiredDevelopers.filter(user => user.id !== this.storeUser.id)
        this.isButtonVisible = true;
      }
    )
    const url = '/orders/' + this.certificateData.id + '/details';
    this.router.navigateByUrl(url);
  }
  cancelProcessing () {
    this.certificateService. cancelProcessing(this.certificateData.id).subscribe(
      (response: Response) => {
      }
    )
    const url = '/orders/' + this.certificateData.id + '/details';
    this.router.navigateByUrl(url);
  }
  approveUser (id) {
    this.certificateService.addDevelop(id, this.certificateData.id).subscribe(
      (response: Response) => {

      }
    )
    const url = '/orders/' + this.certificateData.id + '/details';
    this.router.navigateByUrl(url);
  }


  createReview() {
    const dialogRef = this.dialog.open(ReviewDialog, {
      width: '30vw',
      height: '40vh',
      data: this.reviewData
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.reviewData = result
        this.reviewData.creatorId = this.certificateData.creatorId
        this.reviewData.developerId = this.certificateData.developer.id
        this.certificateService.closeRequest(this.certificateData.id, this.reviewData).subscribe(
          (Response) => {

          }
        )
      }
    });
  }
}
