import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../_models/_index';
import { AuthenticationService } from '../../_services/_index';

@Component({
    selector: 'app-site-header',
    templateUrl: './site-header.component.html'
})

export class SiteHeaderComponent {
    currentUser: User;
    isLoggedIn: Observable<boolean>;

    constructor(private authenticationService: AuthenticationService) {
        this.isLoggedIn = authenticationService.isLoggedIn();

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (this.currentUser) {
            authenticationService.checkUser();
        }

        this.isLoggedIn.subscribe( data => {
            if (data === true) {
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                console.log(this.currentUser);
            }
        });
    }
}
