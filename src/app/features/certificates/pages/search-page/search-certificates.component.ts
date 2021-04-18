import { Component, ViewChildren, OnInit, QueryList, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core'
import { Certificate } from '../../../../models/certificate'
import { CertificateCardComponent } from '../../components/certificate-card/certificate-card.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CertificateParams, CertificateService, CertificateOrderBy } from 'src/app/core/services/certificates.service';
import { debounce } from 'lodash'
import { JwtTokenService } from 'src/app/core/services/jwt-token.service';
import {Store} from "@ngrx/store";
import { AppState, selectAuthState } from 'src/app/store/app.states';
import {Observable} from "rxjs";
import {User} from "../../../../models/user";

@Component({
  selector: 'certificates-page',
  templateUrl: './search-certificates.component.html',
  styleUrls: ['./search-certificates.component.scss'],
})
export class SearchCertificatesPage implements OnInit, AfterViewInit {
  @ViewChildren(CertificateCardComponent) cards: QueryList<CertificateCardComponent>;
  @ViewChild('scrollframe') scrollFrame: ElementRef;
  certificates: Certificate[];
  private scrollContainer: any;
  isLoading: boolean = false;
  buttonValue: String = "PENDING"
  buttonPending: String = "PENDING"
  buttonProgress: String = "IN_PROGRESS"
  buttonComplete: String = "COMPLETE"
  private nextPageLink: string;
  authState: Observable<any>;
  user: User;

  constructor(
    private certificateService: CertificateService,
    private route: ActivatedRoute,
    private tokenService: JwtTokenService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.authState = this.store.select(selectAuthState);
  }

  ngAfterViewInit(): void {
    this.scrollContainer = this.scrollFrame.nativeElement;
  }

  ngOnInit(): void {
    console.log("created")
    if(this.router.url == "/certificates/created") {
      this.authState.subscribe((state) => {
        if(state.user) {
          this.user = state.user;
          this.certificateService.loadCreatedCertificates(this.user.id).subscribe((certificates: any) => this.processCertificates(certificates));
        }
      });

    } else {
      this.route.queryParamMap.subscribe((params) => {
        let textPart: string = params.get('textPart');
        let tagNames: string[] = params.getAll('tagNames');
        let certificateParams: CertificateParams = {textPart: textPart, tagNames: tagNames};
        if (this._userRole == 'ROLE_USER') {
          certificateParams.statuses = ['ACTIVE'];
        }
        this.certificateService.loadCertificates(certificateParams).subscribe((certificates: any) => this.processCertificates(certificates));
      })
    }
  }

  private processCertificates(certificates: any) {
    console.log(certificates)
    if (certificates._embedded) {
      this.certificates = certificates._embedded.serviceDtoList;
      this.cards.changes.subscribe(() => {
        if (this.cards.length == this.certificates.length) {
          this.showCertificates();
        }
      });
      if (certificates._links.next) {
        this.nextPageLink = certificates._links.next.href;
      } else {
        this.nextPageLink = null;
      }
    } else {
      this.certificates = [];
    }

  }

  private debounceCertificateLoading = debounce(() => {
    if (this.isEndOfPage() && !this.isLoading) {
      if (this.nextPageLink) {
        this.isLoading = true;
        this.scrollBottom();
        setTimeout(() => {
          this.certificateService.loadNextPage(this.nextPageLink).subscribe((certificates: any) => {
            this.certificates = this.certificates.concat(certificates._embedded.serviceDtoList);
            if (certificates._links.next) {
              this.nextPageLink = certificates._links.next.href;
            } else {
              this.nextPageLink = null;
            }
            this.isLoading = false;
          });
        }, 2000);
      } else {
        return;
      }
    }
  }, 200);

  @HostListener('mousewheel', ['$event']) onMousewheel(event) {
    this.debounceCertificateLoading();
  }

  isEndOfPage() {
    let coords = this.scrollContainer.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    let bottomVisible = coords.bottom - 10 < windowHeight && coords.bottom > 0;
    return bottomVisible;
  }

  scrollBottom() {

  }
  changeRequestDisplay(type) {
    this.buttonValue = type
  }
  get _userRole(): string {
      const token = this.tokenService.getToken();
      if(token) {
        return this.tokenService.decodeToken(token).roles.toString();
      } else {
        return undefined;
      }
  }

  showCertificates() {
    let certificateTimeout = 100;
    this.cards.forEach(card => {
      if (card.opacity == 0) {
        setTimeout(() => {
          card.showComponent();
        }, certificateTimeout);
        certificateTimeout += 150;
      }
    });
  }
}
