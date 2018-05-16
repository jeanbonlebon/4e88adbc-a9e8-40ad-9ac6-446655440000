import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { appConfig } from '../app.config';

import { File, Toast } from '../_models/_index';

@Injectable()
export class FileService {

    private subject = new Subject<any>();

    constructor(private http: HttpClient) { }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    startUpload(file: any, folder_id: any, name: string) {
        this.subject.next(<Toast>{ file: file, folder_id: folder_id, name: name });
    }

    get(folder_id: any) {
        return this.http.get<File[]>(appConfig.apiUrl + '/file/' + folder_id);
    }

    getOne(_id: any) {
        return this.http.get<File>(appConfig.apiUrl + '/file/one/' + _id);
    }

    create(file: any, folder_id: any) {
        return this.http.request(new HttpRequest('POST', appConfig.apiUrl + '/file/' + folder_id, file, { reportProgress: true }));
    }

    move(_id: any, folder: any) {
        return this.http.put(appConfig.apiUrl + '/file/move/' + _id, folder);
    }

    rename(_id: any, name: any) {
        return this.http.put(appConfig.apiUrl + '/file/rename/' + _id, name);
    }

    download(_id: string) {
        return this.http.get(appConfig.apiUrl + '/file/download/' + _id, { responseType: 'arraybuffer' });
    }

    delete(_id: any) {
        return this.http.delete(appConfig.apiUrl + '/file/' + _id);
    }
}
