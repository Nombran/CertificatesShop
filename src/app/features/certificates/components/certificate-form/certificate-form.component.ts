import { Component, ElementRef, OnInit, Input } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ViewChild } from '@angular/core'
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/models/tag';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TagParams, TagService } from 'src/app/core/services/tag.service';
import { debounce } from 'lodash'
import { Certificate, CertificateStatus } from 'src/app/models/certificate';
import { CertificateService } from 'src/app/core/services/certificates.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import {Observable} from "rxjs"
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'certificate-form',
    templateUrl: './certificate-form.component.html',
    styleUrls: ['./certificate-form.component.scss']
})
export class CertificateFormComponent implements OnInit {
    certificateForm: FormGroup;
    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    @Input() certificateForEdit: Certificate;
    authState: Observable<any>;
    certificateForEditStatus: string;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    tags: Tag[] = [];
    loadedTags: Tag[] = [];
    userId: number;

    constructor(private formBuilder: FormBuilder,
        private tagService: TagService,
        private certificateService: CertificateService,
        private _snackBar: MatSnackBar,
                private router: Router,
        private store: Store<AppState>) {
        this.createForm();
        this.loadTags();

        this.authState = this.store.select(selectAuthState);
    }

    ngOnInit(): void {
        let debouncedTagNameChanges = debounce((value) => {
            const filterValue = value.toLowerCase();
            let tagParams: TagParams = {
                textPart: filterValue
            }
            this.loadTags(tagParams);
        }, 500)
        this._tags.valueChanges.subscribe((value) => {
            debouncedTagNameChanges(value);
        })
        if (this.certificateForEdit) {
            this.fillInDataForEdit();
        }
      this.authState.subscribe((state) => {
        if(state.user) {
          this.userId = state.user.id;
        }
      });
    }

    fillInDataForEdit() {
        this._certificateName.setValue(this.certificateForEdit.name);
        this._certificateDescription.setValue(this.certificateForEdit.description);
        this._price.setValue(this.certificateForEdit.price);
        this.tags = this.certificateForEdit.tags.map(name => {
            let tag = { id: null, name: name };
            return tag;
        });
    }

    createForm() {
        this.certificateForm = this.formBuilder.group({
            certificateName: ['',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)
                ]
            ],
            certificateDescription: ['',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(3000)
                ]
            ],
            price: ['',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(2000)
                ]
            ],
            tagsControl: ['']
        });
    }

    get _certificateName() {
        return this.certificateForm.get('certificateName');
    }

    get _certificateDescription() {
        return this.certificateForm.get('certificateDescription');
    }

    get _price() {
        return this.certificateForm.get('price');
    }

    get _tags() {
        return this.certificateForm.get('tagsControl');
    }
    selected(tag: Tag): void {
        if (!this.tags.find(elem => elem.name == tag.name)) {
            this.tags.push(tag);
        }
        this.tagInput.nativeElement.value = '';
        this._tags.setValue('');
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

    getFormCertificate(): Certificate {
        const name: string = this._certificateName.value;
        const description: string = this._certificateDescription.value;
        const price: number = this._price.value;
        const status: string = this.certificateForEdit? this.certificateForEdit.status : "PENDING"
        const tags: string[] = this.tags.map(tag => tag.name);
        const certificate: Certificate = {
            name: name,
            description: description,
            price: `${price}`,
            tags: tags,
            creatorId: this.userId,
            status: status
        }
        return certificate;
    }

    onSubmit() {
        const certificate: Certificate = this.getFormCertificate();
        this.certificateService.create(certificate).subscribe(
            () => {
                this.toogleSuccessBar("Certificate created successfully!");
                this.certificateForm.reset();
                this.tags = [];
                this.router.navigate(['orders'])
            },
            (error) => {
                this.toggleErrorBar("Certificate name already exists!");
            }
        );
    }

    toogleSuccessBar(message: string) {
        let config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-success'];
        config.duration = 3000;
        this._snackBar.open(message, null, config);
    }

    toggleErrorBar(message: string) {
        let config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-error'];
        config.duration = 3000;
        this._snackBar.open(message, null, config);
    }

    onEdit() {
        let certificate: Certificate = this.getFormCertificate();
        certificate.id = this.certificateForEdit.id;
        this.certificateService.update(certificate).subscribe(
            (response) => {this.toogleSuccessBar("Certificate updated successfully!")},
            (error: HttpErrorResponse) => {
                if(error.status == 409) {
                    this.toggleErrorBar("Certificate name already exists!");
                } else {
                    this.toggleErrorBar("Error in updating certificate!");
                }
            }
        )
    }
}
