import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Folder } from '../_models/folder';

@Injectable()
export class FolderService {

    constructor(private http: Http) { }

    get(_id: string) : Observable<Folder> {
        return this.http.get('/folder/' + _id).map((response: Response) => response.json());
    }

    getChilds(_id: string) : Observable<Folder[]> {
        return this.http.get('/folder/childs/' + _id).map((response: Response) => response.json());
    }

    create(folder: Folder) {
        return this.http.post('/folder', folder);
    }

    move(_id: any) {
        return this.http.put('/folder/move', _id);
    }

    rename(_id: any, name: any) {
        return this.http.put('/folder/rename/' + _id, name);
    }

    delete(_id: string) {
        return this.http.delete('/folder/' + _id);
    }

}
