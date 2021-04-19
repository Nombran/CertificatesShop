import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthenticationService;
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthenticationService);
    const token: string = this.authService.getToken();
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer_${token != null ? token : ''}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}