import { Route } from '@angular/compiler/src/core';
import { Inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { JwtTokenService } from '../services/jwt-token.service'
import { TokenPayLoad } from '../services/token-payload';
import { AppState, selectAuthState } from '../../store/app.states';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class IsLoggedGuard implements CanActivate {

    constructor(private store: Store<AppState>,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       return this.checkForAuthentication();
    }

    checkForAuthentication(): Promise<boolean> {
        const authState: Observable<any> = this.store.select(selectAuthState);
        return new Promise((resolve, reject) => {
            authState.subscribe((state) => {
                if(state.isAuthenticated) {
                    this.router.navigateByUrl('/certificates');
                }
                resolve(!state.isAuthenticated);
            });
        });
    }
}