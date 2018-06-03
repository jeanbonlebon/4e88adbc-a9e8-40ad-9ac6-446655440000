import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../environments/environment';

declare const FB: any;

@Injectable()
export class AuthenticationService {

    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(env.apiUrl + '/auth/login', { email: email, password: password })
            .map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.isLoginSubject.next(true);
                }

                return user;
            });
    }

    register(data: any) {
        return this.http.post<any>(env.apiUrl + '/auth/register', data)
            .map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.isLoginSubject.next(true);
                }

                return user;
            });
    }

    loginFacebook() {
        FB.init({ appId : '1487784628006176', status : false, cookie : false, xfbml : false, version : 'v2.8' });

        return new Promise((resolve, reject) => {
            FB.login(result => {
                if (result.authResponse) {
                    return this.http.post<any>(env.apiUrl + `/auth/facebook`, {access_token: result.authResponse.accessToken})
                    .toPromise()
                    .then(user => {
                        if (user && user.token) {
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            // console.log(JSON.parse(localStorage.getItem('currentUser')));
                            this.isLoginSubject.next(true);
                        }
                        resolve(user);
                    })
                    .catch(() => reject());
                } else {
                    reject();
                }
            }, {scope: 'public_profile, email' });
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.isLoginSubject.next(false);
    }

    checkUser() {
        this.hasToken() ? this.isLoginSubject.next(true) : this.isLoginSubject.next(false);
    }

    private hasToken(): boolean {
        return !!localStorage.getItem('currentUser');
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoginSubject.asObservable();
    }

}
