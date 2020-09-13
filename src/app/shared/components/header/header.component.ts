import { Component, OnInit } from "@angular/core"
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogOut } from 'src/app/store/actions/auth.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { TagService, TagParams } from 'src/app/core/services/tag.service';
import { Tag } from '../../../models/tag'
import { debounce } from 'lodash'
import { CertificateParams } from 'src/app/core/services/certificates.service';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
    public isMenuOpen: boolean = false;
    isUserAuthenticated: boolean;
    authState: Observable<any>;
    tagControl = new FormControl();
    tagSelectControl = new FormControl();
    certificateControl = new FormControl();
    options: Array<string>;
    tagForm: FormGroup = new FormGroup({});
    loadedTags: Tag[];

    constructor(
        private tagService: TagService,
        private store: Store<AppState>,
        private router: Router,
        private route: ActivatedRoute) {
        this.authState = this.store.select(selectAuthState);
        this.loadTags();
    }

    loadTags(tagParams?: TagParams) {
        if (!tagParams) {
            tagParams = {}
        }
        this.tagService.loadTags(tagParams).subscribe((tags: any) => {
            if (tags._embedded) {
                this.loadedTags = tags._embedded.tagDtoList;
            }
            this.options = this.loadedTags.map(value => {
                return value.name;
            });
        });
    }

    ngOnInit(): void {
        this.authState.subscribe((state) => {
            this.isUserAuthenticated = state.isAuthenticated;
        });
        let debouncedTagNameChanges = debounce((value) => {
            const filterValue = value.toLowerCase();
            let tagParams: TagParams = {
                textPart: filterValue
            }
            this.loadTags(tagParams);
        }, 500)
        let debouncedCertificateNameChanges = debounce((value) => {
            let queryParams: CertificateParams = this.router.parseUrl(this.router.url).queryParams;
            queryParams.textPart = value;
            this.router.navigate(['/certificates'], { queryParams: queryParams, relativeTo: this.route });
        }, 500);
        this.tagControl.valueChanges.subscribe(value => {
            debouncedTagNameChanges(value);
        });
        this.certificateControl.valueChanges.subscribe(value => {
            debouncedCertificateNameChanges(value);
        })
    }

    public onSidenavClick(): void {
        this.isMenuOpen = false;
    }

    public logOut(): void {
        this.store.dispatch(new LogOut());
    }

    get _routeUrl() {
        return this.router.url;
    }

    tagChoosed(tag: Tag) {
        this.tagControl.setValue('');
        let params = this.router.parseUrl(this.router.url).queryParamMap;
        let tagNames: string[] = params.getAll('tagNames');
        if(tagNames.find(element => element === tag.name)) {
            return;
        }
        tagNames.push(tag.name);
        let queryParams: CertificateParams = this.router.parseUrl(this.router.url).queryParams;
        queryParams.tagNames = tagNames;
        this.router.navigate(['/certificates'], { queryParams: queryParams, relativeTo: this.route });
    }

    ifCertificatesRoute() {
        return this._routeUrl.split('?')[0] == '/certificates';
    }
}