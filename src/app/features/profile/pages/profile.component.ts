import {AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState, selectAuthState} from "../../../store/app.states";
import {Certificate} from '../../../models/certificate';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {User} from '../../../models/user';


@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfilePageComponent {
  authState: Observable<any>;
  storeUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.authState = this.store.select(selectAuthState);
    this.authState.subscribe((state) => {
      this.storeUser = state.user;
    })
      }
}
