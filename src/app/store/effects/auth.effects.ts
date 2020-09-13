import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs'
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure,
  LogOut,
  GetStatus,
} from '../actions/auth.actions';
import { AuthenticationService } from '../../core/services/authentication.service';
import { User } from 'src/app/models/user';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload: any) => {
      return this.authService.authenticateUser(payload.username, payload.password)
        .pipe(
          tap((authResult) => {
            localStorage.setItem('token', authResult.token);
          }),
          switchMap(() => {
            return this.authService.loadUserByToken()
              .pipe(
                map((user: User) => {
                  return new LogInSuccess({ user: user });
                }));
          }),
          catchError((error) => {
            return of(new LogInFailure({ error: error }));
          }));
    }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((authResult) => {
      if (this.router.url.includes('/login')) {
        this.router.navigateByUrl('/certificates');
      }
    }));

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload).pipe(
        map((user) => {
          return new SignUpSuccess({ user: user });
        }),
        catchError((error) => {
          console.log(error);
          return of(new SignUpFailure({ error: error }));
        }));
    }));

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      this.router.navigateByUrl('/login');
    })
  );

  @Effect({ dispatch: false })
  AuthFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE, AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect()
  GetStatus: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_STATUS),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.loadUserByToken().pipe(
        map((user) => {
          return new LogInSuccess({ user: user });
        }),
        catchError((error) => {
          console.log(error);
          return of(new LogInFailure({ error: error }));
        }));
    }));
}
