import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {

    public alert: Subject<string> = new Subject();

    constructor(private router: Router, private snackBar: MatSnackBar) {

        this.alert.subscribe(message => {
            this.showSnackbar(message);
        });

    }

    private showSnackbar(data: string) {
        this.snackBar.open(data, null, { duration: 3000 });
    }

}
