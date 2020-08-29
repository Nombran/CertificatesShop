import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@NgModule({
    imports: [HttpClientModule],
    declarations: [],
    providers: []
  })
  export class CoreModule {
    static forRoot(): ModuleWithProviders<CoreModule> {
      return {
        ngModule: CoreModule,
        providers: [AuthenticationService]
      }
    }
  }