import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { JwtTokenService } from './services/jwt-token.service';
import { CertificateService } from './services/certificates.service';
import { TagService } from './services/tag.service'
import { TokenInterceptor } from './interceptors/token.interceptor'
import { ErrorInterceptor } from './interceptors/auth-error.interceptor'

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, 
  {
    provide:HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AuthenticationService,
        JwtTokenService,
        CertificateService,
        TagService
      ]
    }
  }
}