import { Component, Input } from '@angular/core'
import { Tag } from 'src/app/models/tag'
import { ActivatedRoute, Router } from '@angular/router';
import { CertificateParams } from 'src/app/core/services/certificates.service';

@Component({
    selector: 'tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent {
    @Input() tagData: Tag;

    constructor(private route: ActivatedRoute,
        private router: Router) {
    }

    removeTag() {
        let params = this.router.parseUrl(this.router.url).queryParamMap;
        let tagNames = params.getAll('tagNames');
        let tagIndex = tagNames.findIndex(element => element === this.tagData.name);
        tagNames.splice(tagIndex, 1);
        let queryParams: CertificateParams = this.router.parseUrl(this.router.url).queryParams;
        queryParams.tagNames = tagNames;
        this.router.navigate(['/certificates'], { queryParams: queryParams, relativeTo: this.route });
    }
}