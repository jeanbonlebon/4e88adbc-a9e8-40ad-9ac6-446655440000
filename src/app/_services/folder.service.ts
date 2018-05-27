import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Folder } from '../_models/folder';

@Injectable()
export class FolderService {

    private _listener = new Subject<any>();
    thisFolder: string;

    constructor(private http: HttpClient) { }

    _listenReload(): Observable<any> {
        return this._listener.asObservable();
    }

    reload(folderID: any) {
        this._listener.next(folderID);
    }

    actualFolder(name: string) {
        this.thisFolder = name;
    }

    get(_id: string) {
        return this.http.get<Folder>(env.apiUrl + '/folder/' + _id);
    }

    getChilds(_id: string) {
        return this.http.get<Folder[]>(env.apiUrl + '/folder/childs/' + _id);
    }

    create(folder: any) {
        return this.http.post(env.apiUrl + '/folder', folder);
    }

    move(_id: any, folder: any) {
        return this.http.put(env.apiUrl + '/folder/move/' + _id, folder);
    }

    rename(_id: any, name: any) {
        return this.http.put(env.apiUrl + '/folder/rename/' + _id, name);
    }

    download(_id: any) {
        return this.http.get(env.apiUrl + '/folder/download/' + _id, { responseType: 'arraybuffer' });
    }

    delete(_id: string) {
        return this.http.delete(env.apiUrl + '/folder/' + _id);
    }

}
