import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {

    public alert: Subject<string> = new Subject();

    constructor(private snackBar: MatSnackBar) {

        this.alert.subscribe(message => {
            snackBar.open(message, null, { duration: 3000 });
        });

    }

    showToaster(message: string) {

    }
}
