import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';

import { File } from '../_models/file';

@Injectable()
export class FileService {

    constructor(private http: HttpClient) { }

    get(folder_id: any) {
        return this.http.get<File[]>(appConfig.apiUrl + '/file/' + folder_id)
    }

    create(file: any, folder_id: any) {
        return this.http.post(appConfig.apiUrl + '/file/' + folder_id, file);
    }

}
