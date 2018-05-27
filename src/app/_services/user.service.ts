import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

import { User } from '../_models/user';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    get() {
        return this.http.get<User>(env.apiUrl + '/user');
    }

}
