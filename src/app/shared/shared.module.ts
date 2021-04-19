import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { AppRoutingModule } from '../app-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FeaturesModule } from '../features/features.module'
import { CoreModule } from '../core/core.module'
import { MatBadgeModule } from '@angular/material/badge';
import {FooterComponent} from "./components/footer/footer.component";
import {ReviewDialog} from "./components/dialog/dialog.component";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ReviewDialog
    ],
  imports: [
    MatBadgeModule,
    FeaturesModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatAutocompleteModule,
    CoreModule,
    MatDialogModule,
    FormsModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    MatAutocompleteModule,
    FooterComponent
  ]
})
export class SharedModule { }
