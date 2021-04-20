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
import { ShoppingCardPageComponent } from './shopping-card/pages/shopping-card-page/shop-card.component';
import { CertificateElementComponent } from './shopping-card/components/certificate-element/certificate-elem.component'
import { ItemDetailsPageComponent } from './certificates/pages/item-details-page/item-details.component'
import { OrderItemComponent } from './orders/components/order-item/order-item.component'
import { PastOrdersPageComponent } from './orders/pages/past-orders/past-orders.component'
import { OrderDetailsPageComponent } from './orders/pages/order-details/order-details.component'
import {ProfilePageComponent} from './profile/pages/profile.component';
import {ProfileFormComponent} from './profile/components/profile-form.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
    declarations: [
        OrderDetailsPageComponent,
        PastOrdersPageComponent,
        OrderItemComponent,
        ItemDetailsPageComponent,
        CertificateElementComponent,
        ShoppingCardPageComponent,
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
        CreateTagPageComponent,
        ProfilePageComponent,
        ProfileFormComponent,
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
        MatButtonToggleModule,
    ],
    exports: [LoginPageComponent, ReactiveFormsModule, RegistrationPageComponent]
})
export class FeaturesModule {

}
