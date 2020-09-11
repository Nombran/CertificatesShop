import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../../environments/environment';

export enum CertificateOrderBy {
    ID = "id",
    CREATION_DATE = "creation_date",
    MODIFICATION_DATE = "modification_date",
    NAME = "name",
    DESCRIPTION = "description",
    PRICE = "price",
    DURATION = "duration"
}

export interface CertificateParams {
    tagNames?: Array<string>,
    textPart?: string,
    orderBy?: CertificateOrderBy,
    page?: number,
    perPage?: number
}

@Injectable({ providedIn: 'root' })
export class CertificateService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    loadCertificates(params: CertificateParams) {
        let httpParams: HttpParams = new HttpParams();
        if (params.orderBy) {
            httpParams = httpParams.set('orderBy', params.orderBy);
        }
        if (params.page) {
            httpParams = httpParams.set('page', params.page.toString());
        }
        if (params.perPage) {
            httpParams = httpParams.set('perPage', params.perPage.toString());
        } else {
            httpParams = httpParams.set('perPage', '10');
        }
        if (params.tagNames) {
            Array.prototype.forEach.call(params.tagNames, (tagName: string) => {
                httpParams = httpParams.set('tagNames', tagName);
            });
        }
        if (params.textPart) {
            httpParams = httpParams.set('textPart', params.textPart);
        }
        return this.http.get(this.apiUrl + 'certificates', { params: httpParams });
    }

    loadNextPage(nextPageLink: string) {
        return this.http.get(nextPageLink);
    }
}