import { Injectable } from '@angular/core';
import { sha3_256 } from 'js-sha3';
import { appConfig } from '../app.config';

import { File } from '../_models/_index';

@Injectable()
export class LinkConstructor {
    public get(file: File) {
        const extension = file.name.split('.');
        const filename = file._id.toString() + '.' + extension[extension.length - 1];
        return appConfig.apiUrl + '/files/' + sha3_256(file.user.toString()) + '/' + filename;
    }
}
