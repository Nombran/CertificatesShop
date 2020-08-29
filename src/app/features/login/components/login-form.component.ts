import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/authentication.service';

export interface AuthenticationResult {
    token: string;
    tokenValidity: number;
}

@Component({
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
    selector: "login-form"
})
export class LoginFormComponent {
    loginForm: FormGroup

    constructor(private formBuilder: FormBuilder,
        private authService: AuthenticationService) {
        this.createForm();
    }

    private createForm() {
        this.loginForm = this.formBuilder.group({
            login: ['',
                [Validators.required,
                Validators.minLength(5),
                Validators.maxLength(16)]
            ],
            password: ['', [Validators.required,
            Validators.minLength(5),
            Validators.maxLength(16)]
            ]
        })
    }

    get _login() {
        return this.loginForm.get('login');
    }

    get _password() {
        return this.loginForm.get('password');
    }

    authenticate() {
        this.authService
            .authenticateUser(this._login.value, this._password.value)
            .subscribe((result: AuthenticationResult) => {
                console.log(result.token);
                console.log(result.tokenValidity);
            });
    }
}