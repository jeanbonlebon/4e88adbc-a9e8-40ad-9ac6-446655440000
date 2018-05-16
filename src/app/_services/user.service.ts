import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';

import { User } from '../_models/user';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    get() {
        return this.http.get<User>(appConfig.apiUrl + '/user');
    }

}
