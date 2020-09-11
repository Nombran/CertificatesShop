import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState, selectAuthState } from '../../../store/app.states';
import { Store } from '@ngrx/store';
import { LogIn } from 'src/app/store/actions/auth.actions';
import { Observable } from 'rxjs';

export interface AuthenticationResult {
    token: string;
    tokenValidity: number;
}

@Component({
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
    selector: "login-form"
})
export class LoginFormComponent implements OnInit {
    loginForm: FormGroup
    authState: Observable<any>;

    constructor(private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,) {
        this.createForm();
        this.authState = this.store.select(selectAuthState);
    }
    ngOnInit(): void {
        this.authState.subscribe((state) => {
            if (state.errorMessage != null) {
                this._snackBar.open(state.errorMessage, null, {
                    duration: 2000,
                });
            }
        });
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
        if (this._login.invalid || this._password.invalid) {
            return;
        }
        const payload: any = {
            username: this._login.value,
            password: this._password.value
        };
        this.store.dispatch(new LogIn(payload));
    }
}