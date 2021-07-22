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
import { JwtTokenService } from 'src/app/core/services/jwt-token.service';
import { Cookies } from '@cedx/ngx-cookies';

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {

}
