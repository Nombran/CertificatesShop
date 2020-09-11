import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { SignUp } from 'src/app/store/actions/auth.actions';

@Component({
    selector: 'register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
    registerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>) {
        this.createForm();
    }

    private createForm() {
        this.registerForm = this.formBuilder.group({
            login: ['',
                [Validators.required,
                Validators.minLength(5),
                Validators.maxLength(16)]
            ],
            password: ['', [Validators.required,
            Validators.minLength(5),
            Validators.maxLength(16)]
            ],
            firstName: ['',
                [Validators.required,
                Validators.minLength(5),
                Validators.maxLength(16)]
            ],
            lastName: ['',
                [Validators.required,
                Validators.minLength(5),
                Validators.maxLength(16)]
            ],
            repeatPassword: ['',
                [Validators.required,
                Validators.minLength(5),
                Validators.maxLength(16)]
            ],
        })
    }

    get _login() {
        return this.registerForm.get('login');
    }

    get _password() {
        return this.registerForm.get('password');
    }

    get _firstName() {
        return this.registerForm.get('firstName');
    }

    get _lastName() {
        return this.registerForm.get('lastName');
    }

    get _repeatPassword() {
        return this.registerForm.get('repeatPassword');
    }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            alert("invalid form");
        }

        const payload = {
            login: this._login.value,
            password: this._password.value,
            firstName: this._firstName.value,
            lastName: this._lastName.value,
          };
        this.store.dispatch(new SignUp(payload));
    }
}