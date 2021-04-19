import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module';
import { FeaturesModule } from './features/features.module'
import { CoreModule } from './core/core.module'
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.states';

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
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
