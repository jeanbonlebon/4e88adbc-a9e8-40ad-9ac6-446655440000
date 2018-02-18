import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { File } from '../_models/file';

@Injectable()
export class FileService {

    constructor(private http: Http) { }

    get(folder_id: any) : Observable<File[]> {
        return this.http.get('/file/' + folder_id).map((response: Response) => response.json());
    }

    create(file: any) {
        return this.http.post('/file', file);
    }

}
