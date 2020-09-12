import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagService } from 'src/app/core/services/tag.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
    selector: 'create-tag-form',
    templateUrl: './create-form.component.html',
    styleUrls: ['./create-form.component.scss']
})
export class CreateTagFormComponent implements OnInit {
    tagForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private tagService: TagService,
        private _snackBar: MatSnackBar) {
        this.createForm();
    }

    createForm() {
        this.tagForm = this.formBuilder.group({
            tagName: ['', [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]
            ]
        });
    }

    ngOnInit(): void {
        this._tagName.valueChanges.subscribe((value) => {
            if (!this._tagName.touched) {
                this._tagName.markAsTouched();
                this._tagName.markAsDirty();
                this._tagName.markAsPending();
            }
        })
    }

    clearInput() {
        this._tagName.setValue('');
        this._tagName.markAsPristine();
        this._tagName.markAsUntouched();
    }

    get _tagName() {
        return this.tagForm.get('tagName');
    }

    getErrorMessage() {
        if (this._tagName.hasError('required')) {
            return 'You must enter a value';
        }
        return this._tagName.invalid ? 'Tag name value length must be between 3 and 20 characters' : '';
    }

    onSubmit() {
        const tagName = this._tagName.value;
        this.tagService.createTag(tagName).subscribe(
            () => {
                let config = new MatSnackBarConfig();
                config.panelClass = ['snackbar-success'];
                config.duration = 3000;
                this._snackBar.open("Tag created successfully!", null, config);
                this._tagName.setValue('');
                this.clearInput();
            },
            (error) => {
                let config = new MatSnackBarConfig();
                config.panelClass = ['snackbar-error'];
                config.duration = 3000;
                this._snackBar.open("Tag name already exists!", null, config);
            }
        )
    }
}