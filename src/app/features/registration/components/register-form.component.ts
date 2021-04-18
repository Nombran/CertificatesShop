import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { AppState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { SignUp } from 'src/app/store/actions/auth.actions';
import {Tag} from '../../../models/tag';
import {TagParams, TagService} from '../../../core/services/tag.service';
import { debounce } from 'lodash'
import {User} from '../../../models/user';

@Component({
    selector: 'register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @Input() userForEdit: User;
    registerForm: FormGroup;
    tags: Tag[] = [];
    loadedTags: Tag[] = [];


    constructor(
        private tagService: TagService,
        private formBuilder: FormBuilder,
        private store: Store<AppState>) {
        this.createForm();
        this.loadTags();
    }
    ngOnInit(): void {
    const debouncedTagNameChanges = debounce((value) => {
      const filterValue = value.toLowerCase();
      const tagParams: TagParams = {
        textPart: filterValue
      }
      this.loadTags(tagParams);
    }, 500)
      if (this.userForEdit) {
        this.fillInDataForEdit();
      }
    this._tags.valueChanges.subscribe((value) => {
      debouncedTagNameChanges(value);
    })
  }
  fillInDataForEdit() {
    this._firstName.setValue(this.userForEdit.firstName);
    this._lastName.setValue(this.userForEdit.lastName);
    this._login.setValue(this.userForEdit.login);
    this._contacts.setValue(this.userForEdit.contacts);
    this._aboutMySelf.setValue(this.userForEdit.about);
    this._reward.setValue(this.userForEdit.salary);
    this._sphere.setValue(this.userForEdit.activity);
    this.tags = this.userForEdit.skills.map(name => {
      let tag = { id: null, name: name };
      return tag;
    });
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
                Validators.pattern("[А-Яа-я]+-{0,1}[А-Яа-я]+")]
            ],
            lastName: ['',
                [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(25),
                Validators.pattern("[А-Яа-я]+-{0,1}[А-Яа-я]+")]
            ],
            repeatPassword: ['',
                [Validators.required,
                    this.matchValues()]
            ],
            contacts: ['',
              [Validators.required,
                Validators.minLength(1),
                Validators.maxLength(100),
                Validators.pattern("[А-Яа-я]+-{0,1}[А-Яа-я]+")]
            ],
           tagsControl: [''],
            specialized: ['',
              [
                Validators.minLength(1),
                Validators.maxLength(100),]
            ],
            sphere: ['',
              [
                  Validators.minLength(1),
                  Validators.maxLength(100),]
              ],
            reward: ['',
              [
              Validators.minLength(1),
              Validators.maxLength(100),]
            ],
            aboutMySelf: ['',
              [
              Validators.minLength(1),
              Validators.maxLength(100),]
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
    loadTags(tagParams?: TagParams) {
      if (!tagParams) {
        tagParams = {}
      }
      this.tagService.loadTags(tagParams).subscribe((tags: any) => {
        if (tags._embedded) {
          this.loadedTags = tags._embedded.tagDtoList;
        }
      });
    }
  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
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
    get _contacts() {
      return this.registerForm.get('contacts');
    }
    get _skills() {
      return this.registerForm.get('skills');
    }
    get _specialized() {
      return this.registerForm.get('specialized');
    }
    get _sphere() {
      return this.registerForm.get('sphere');
    }
    get _reward() {
      return this.registerForm.get('reward');
    }
    get _aboutMySelf() {
      return this.registerForm.get('aboutMySelf');
    }
    get _tags() {
      return this.registerForm.get('tagsControl');
    }
    selected(tag: Tag): void {
      if (!this.tags.find(elem => elem.name == tag.name)) {
        this.tags.push(tag);
      }
      this.tagInput.nativeElement.value = '';
      this._tags.setValue('');
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
            contacts: this._contacts.value,
            skills: this.tags.map(el=>el.name),
            specialization: this._specialized.value,
            activity: this._sphere.value,
            salary: this._reward.value,
            about: this._aboutMySelf.value,
        };
        this.store.dispatch(new SignUp(payload));
    }
}
