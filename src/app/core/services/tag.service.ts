import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../../environments/environment';
 
export interface TagParams {
    textPart?: string;
    perPage?: number;
    page? :number;
}

@Injectable({providedIn: 'root'})
export class TagService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    loadTags(params: TagParams) {
        let httpParams: HttpParams = new HttpParams();
        if(params.page) {
            httpParams = httpParams.set('page', params.page.toString());
        }
        if(params.perPage) {
            httpParams = httpParams.set('perPage', params.perPage.toString());
        } else {
            // httpParams = httpParams.set('perPage', '10');
        }
        if(params.textPart) {
            httpParams = httpParams.set('textPart', params.textPart);
        }
        return this.http.get(this.apiUrl + 'tags', {params: httpParams});
    }

    createTag(name: string) {
        const body = {
            name: name
        }
        return this.http.post(this.apiUrl + 'tags', body);
    }
}
