import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private loginUrl = environment.apiUrl + 'auth/login';
    private signUpUrl = environment.apiUrl + 'users';

    constructor(private http: HttpClient) { }

    authenticateUser(login: string, password: string): Observable<any> {
        let body = { username: login, password: password };
        return this.http.post(this.loginUrl, body);
    }

    signUp(body: any) {
        console.log(body)
        return this.http.post(this.signUpUrl, body);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    loadUserByToken() {
        const url = environment.apiUrl + 'users/me';
        return this.http.get(url);
    }
}