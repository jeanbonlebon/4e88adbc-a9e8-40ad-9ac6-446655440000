import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RouterService {

    private subject = new Subject<any>();

    routeChange(main: boolean) {
        this.subject.next(main)
    }

    getRoute(): Observable<any> {
        return this.subject.asObservable();
    }
}
