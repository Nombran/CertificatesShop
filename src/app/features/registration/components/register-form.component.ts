import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
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
                Validators.maxLength(15),
                Validators.pattern("[A-Za-z0-9]+")]
            ],
            password: ['', [Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15),
            Validators.pattern("[A-Za-z0-9]+")]
            ],
            firstName: ['',
                [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(25),
                Validators.pattern("[A-Za-z]+-{0,1}[A-Za-z]+")]
            ],
            lastName: ['',
                [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(25),
                Validators.pattern("[A-Za-z]+-{0,1}[A-Za-z]+")]
            ],
            repeatPassword: ['',
                [Validators.required,
                    this.matchValues()]
            ],
        })
    }

    matchValues(): (AbstractControl) => ValidationErrors | null {
        console.log("here");
        return (control: AbstractControl): ValidationErrors | null => {
            return this.registerForm 
            && this._password.value == this._repeatPassword.value
                ? null
                : { matching: true };
        };
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
            return;
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
