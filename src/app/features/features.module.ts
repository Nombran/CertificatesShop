import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login/components/login-form.component';
import { LoginPageComponent } from './login/pages/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistrationPageComponent } from './registration/pages/registration-page.component'
import { RegisterFormComponent } from './registration/components/register-form.component'
import { BrowserModule } from '@angular/platform-browser'
import { SearchCertificatesPage } from './certificates/pages/search-page/search-certificates.component';
import { CertificateCardComponent } from './certificates/components/certificate-card/certificate-card.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagPanelComponent } from './certificates/components/tag-panel/tag-panel.component'
import { TagComponent } from './certificates/components/tag/tag.component'
import { MatIconModule } from '@angular/material/icon'
import { CreateTagFormComponent } from './tags/components/create-form/create-form.component'
import { CreateTagPageComponent } from './tags/pages/create-page/create-page.component'
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { CreateCertificatePageComponent } from './certificates/pages/create-page/create-page.component'
import { CertificateFormComponent } from './certificates/components/certificate-form/certificate-form.component'
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { EditCertificatePageComponent } from './certificates/pages/edit-page/edit-page.component'

@NgModule({
    declarations: [
        EditCertificatePageComponent,
        CreateCertificatePageComponent,
        CertificateFormComponent,
        CreateCertificatePageComponent,
        LoginFormComponent,
        LoginPageComponent,
        RegistrationPageComponent,
        RegisterFormComponent,
        SearchCertificatesPage,
        CertificateCardComponent,
        TagPanelComponent,
        TagComponent,
        CreateTagFormComponent,
        CreateTagPageComponent
    ],
    imports: [
        MatAutocompleteModule,
        MatChipsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        CommonModule,
        MatSnackBarModule,
        BrowserModule,
        BrowserAnimationsModule,
    ],
    exports: [LoginPageComponent, ReactiveFormsModule, RegistrationPageComponent]
})
export class FeaturesModule {

}