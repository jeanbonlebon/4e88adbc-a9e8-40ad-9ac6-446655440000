import { Injectable } from '@angular/core';
import { sha3_256 } from 'js-sha3';
import { environment as env } from '../../environments/environment';

import { File } from '../_models/_index';

@Injectable()
export class LinkConstructor {
    public get(file: File) {
        const extension = file.name.split('.');
        const filename = file._id.toString() + '.' + extension[extension.length - 1];
        return env.apiUrl + '/files/' + sha3_256(file.user.toString()) + '/' + filename;
    }
}
