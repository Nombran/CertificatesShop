import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { TokenPayLoad } from './token-payload';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JwtTokenService {

  constructor() {
  }

  decodeToken(token: string): TokenPayLoad {
    return jwt_decode(token);
  }

  isTokenExpired(tokenPayload: TokenPayLoad): boolean {
    const expiryTime = tokenPayload.exp;
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}