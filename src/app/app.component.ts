import { Component } from '@angular/core';
import { AppState, selectAuthState } from './store/app.states';
import { Store } from '@ngrx/store';
import { GetStatus } from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<AppState>) {
    if (localStorage.getItem('token')) {
      this.store.dispatch(new GetStatus);
    }
  }
}
