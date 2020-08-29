import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module';
import { FeaturesModule } from './features/features.module'
import { CoreModule } from './core/core.module'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    FeaturesModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
