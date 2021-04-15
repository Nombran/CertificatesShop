import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Certificate } from 'src/app/models/certificate';
import { Cookies } from '@cedx/ngx-cookies';
import { CookieOptions } from '@cedx/ngx-cookies';

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
    statuses?: string[]
}

@Injectable({ providedIn: 'root' })
export class CertificateService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient,
        private cookies: Cookies) {
    }

    loadCertificates(params: CertificateParams) {
        let httpParams: HttpParams = new HttpParams();
        if (params.orderBy) {
            httpParams = httpParams.set('orderBy', params.orderBy);
        } else {
            httpParams = httpParams.set('orderBy', 'modificationDate');
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
        if (params.statuses) {
            Array.prototype.forEach.call(params.statuses, (status: string) => {
                httpParams = httpParams.set('statuses', status);
            });
        }
        if (params.textPart) {
            httpParams = httpParams.set('textPart', params.textPart);
        }
        return this.http.get(this.apiUrl + 'certificates', { params: httpParams });
    }

    loadCreatedCertificates(userId: number) {
      return this.http.get(this.apiUrl + 'users/' + userId + '/services/created');
    }


    loadNextPage(nextPageLink: string) {
        return this.http.get(nextPageLink);
    }

    create(certificate: Certificate) {
        return this.http.post(this.apiUrl + 'certificates', certificate);
    }

    findById(id: number) {
        return this.http.get(this.apiUrl + 'certificates/' + id);
    }

    update(certificate: Certificate) {
        const url = this.apiUrl + 'certificates/' + certificate.id;
        return this.http.put(url, certificate);
    }

    addCertificateToCard(certificate: Certificate, userId: number) {
        let card: Certificate[] = this.getCertificateCard(userId);
        let date = new Date(Date.now() + 86400e3);
        let certificateInCard = card.find(elem => elem.id == certificate.id);
        this.clearCard(userId);
        this.cookies.set('card_' + userId, JSON.stringify(card), new CookieOptions({
            expires: date,
            path: '/'
        }));
    }

    getCertificateCard(userId: number): Certificate[] {
        let stringCard = this.cookies.get('card_' + userId);
        let card: Certificate[];
        if (stringCard) {
            card = JSON.parse(stringCard);
        } else {
            card = [];
        }
        return card;
    }

    removeFromCard(certificate: Certificate, userId: number): void {
        let card: Certificate[] = this.getCertificateCard(userId);
        let certificateFromCard = card.find(elem => elem.id == certificate.id);
        let date = new Date(Date.now() + 86400e3);
        this.clearCard(userId);
        this.cookies.set('card_' + userId, JSON.stringify(card), new CookieOptions({
            expires: date,
            path: '/'
        }));
    }

    clearCard(userId: number): void {
        this.cookies.remove('card_' + userId);
    }
}
