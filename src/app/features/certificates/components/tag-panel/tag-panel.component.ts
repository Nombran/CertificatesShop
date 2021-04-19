import { Component, OnInit, ViewChildren, QueryList } from '@angular/core'
import { Tag } from '../../../../models/tag'
import { TagComponent } from '../tag/tag.component';
import { ActivatedRoute } from '@angular/router';
import { CertificateParams } from 'src/app/core/services/certificates.service';

@Component({
    selector: 'tag-panel',
    templateUrl: './tag-panel.component.html',
    styleUrls: ['./tag-panel.component.scss']
})
export class TagPanelComponent implements OnInit{
    tags: Tag[] = [];
    @ViewChildren(TagComponent) tagComponents: QueryList<TagComponent>;

    constructor(private route: ActivatedRoute){}

    ngOnInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            let tagNames: string[] = params.getAll('tagNames');
            if(tagNames.length != 0) {
                this.tags = [];
                Array.prototype.forEach.call(tagNames, (name) => {
                    this.tags.push({id: null, name: name});
                });
            } else {
                this.tags = [];
            }
        });
    }
    
}