import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState, selectAuthState} from "../../../store/app.states";


@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfilePageComponent {
  authState: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.route.paramMap.subscribe(
      (params => {
        const certificateId = Number(params.get('id'));
      })
    );


    this.authState = this.store.select(selectAuthState);

  }
}
