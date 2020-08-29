import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
    imports: [],
    declarations: [],
    providers: []
  })
  export class CoreModule {
    static forRoot(): ModuleWithProviders<CoreModule> {
      return {
        ngModule: CoreModule,
        providers: []
      }
    }
  }