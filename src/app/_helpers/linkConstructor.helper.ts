import { Injectable } from '@angular/core';
import { sha3_256 } from 'js-sha3';
import { appConfig } from '../app.config';

import { File } from '../_models/_index';

@Injectable()
export class LinkConstructor {
    public get(file: File) {
        let extension = file.name.split('.')
        return appConfig.apiUrl + '/files/' + sha3_256(file.user.toString()) + '/' + file._id.toString() + '.' + extension[extension.length -1]
    }
}
