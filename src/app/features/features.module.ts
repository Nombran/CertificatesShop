import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login/components/login-form.component';
import { LoginPageComponent } from './login/pages/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        LoginFormComponent, LoginPageComponent
    ],
    imports: [ReactiveFormsModule, CommonModule],
    exports: [LoginPageComponent, ReactiveFormsModule]
})
export class FeaturesModule { }