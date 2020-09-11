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

@NgModule({
    declarations: [
        LoginFormComponent,
        LoginPageComponent,
        RegistrationPageComponent,
        RegisterFormComponent,
        SearchCertificatesPage,
        CertificateCardComponent,
        TagPanelComponent,
        TagComponent
    ],
    imports: [
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