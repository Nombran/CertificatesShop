import { Route } from '@angular/compiler/src/core';
import { Inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { JwtTokenService } from '../services/jwt-token.service'
import { TokenPayLoad } from '../services/token-payload';

@Injectable({providedIn: 'root'})
export class UserGuard implements CanActivate {

    constructor(private tokenService: JwtTokenService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const token: string = this.tokenService.getToken();
        if(token) {
            const decodeToken: TokenPayLoad = this.tokenService.decodeToken(token);
            const role: string = decodeToken.roles.toString();
            if(role == 'ROLE_USER') {
                return true;
            } else {
                this.router.navigateByUrl('/certificates');
                return false;
            }
        } else {
            this.router.navigateByUrl('/certificates');
            return false;
        }
    }

}