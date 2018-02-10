import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../_models/user';

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    get() : Observable<User> {
        return this.http.get('/user').map((response: Response) => response.json());
    }

}
