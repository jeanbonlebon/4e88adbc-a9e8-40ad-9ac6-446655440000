import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';

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
        return this.http.get<Folder>(appConfig.apiUrl + '/folder/' + _id);
    }

    getChilds(_id: string) {
        return this.http.get<Folder[]>(appConfig.apiUrl + '/folder/childs/' + _id);
    }

    create(folder: any) {
        return this.http.post(appConfig.apiUrl + '/folder', folder);
    }

    move(_id: any, folder: any) {
        return this.http.put(appConfig.apiUrl + '/folder/move/' + _id, folder);
    }

    rename(_id: any, name: any) {
        return this.http.put(appConfig.apiUrl + '/folder/rename/' + _id, name);
    }

    download(_id: any) {
        return this.http.get(appConfig.apiUrl + '/folder/download/' + _id, { responseType: 'arraybuffer' });
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/folder/' + _id);
    }

}
