import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private apiUrl = environment.apiUrl + 'auth/login';

    constructor(private http: HttpClient) {}

    authenticateUser(login: string, password: string): Observable<any> {
        let body = {username: login, password: password};
        return this.http.post(this.apiUrl, body);
    }
}