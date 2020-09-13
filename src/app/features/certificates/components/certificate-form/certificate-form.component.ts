import { Component, ElementRef, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ViewChild } from '@angular/core'
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Tag } from 'src/app/models/tag';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { TagParams, TagService } from 'src/app/core/services/tag.service';
import { debounce } from 'lodash'
import { Certificate, CertificateStatus } from 'src/app/models/certificate';
import { CertificateService } from 'src/app/core/services/certificates.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
    selector: 'certificate-form',
    templateUrl: './certificate-form.component.html',
    styleUrls: ['./certificate-form.component.scss']
})
export class CertificateFormComponent implements OnInit{
    certificateForm: FormGroup;
    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    tags: Tag[] = [];
    loadedTags: Tag[] = [];

    constructor(private formBuilder: FormBuilder,
        private tagService: TagService,
        private certificateService: CertificateService,
        private _snackBar: MatSnackBar) {
        this.createForm();
        this.loadTags();
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
    }

    createForm() {
        this.certificateForm = this.formBuilder.group({
            certificateName: ['',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)
                ]
            ],
            certificateDescription: ['',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)
                ]
            ],
            duration: ['',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(100)
                ],
            ],
            price: ['',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(100)
                ]
            ],
            status: ['', [Validators.required]],
            tagsControl: ['']
        });
    }

    get _certificateName() {
        return this.certificateForm.get('certificateName');
    }

    get _certificateDescription() {
        return this.certificateForm.get('certificateDescription');
    }

    get _duration() {
        return this.certificateForm.get('duration');
    }

    get _price() {
        return this.certificateForm.get('price');
    }

    get _tags() {
        return this.certificateForm.get('tagsControl');
    }

    get _status() {
        return this.certificateForm.get('status');
    }

    selected(tag: Tag): void {
        if(!this.tags.find(elem => elem.name == tag.name)) {
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

    
      onSubmit() {
          const name: string = this._certificateName.value;
          const description: string = this._certificateDescription.value;
          const duration: number = this._duration.value;
          const price: number = this._price.value;
          const status: string = this._status.value;
          const tags: string[] = this.tags.map(tag => tag.name);
          const certificate: Certificate = {
              name: name,
              description: description,
              duration: duration,
              price: price,
              status: status,
              tags: tags
          }
          this.certificateService.create(certificate).subscribe(
            () => {
                let config = new MatSnackBarConfig();
                config.panelClass = ['snackbar-success'];
                config.duration = 3000;
                this._snackBar.open("Certificate created successfully!", null, config);
                this.certificateForm.reset();
                this.tags = [];
            },
            (error) => {
                let config = new MatSnackBarConfig();
                config.panelClass = ['snackbar-error'];
                config.duration = 3000;
                this._snackBar.open("Certificate name already exists!", null, config);
            }
          );
      }
}