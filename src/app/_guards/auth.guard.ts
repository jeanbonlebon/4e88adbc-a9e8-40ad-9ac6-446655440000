import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { RouterService } from '../_services/_index';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private routerService: RouterService) { }

    canActivate() {

        if(this.router.url == "/" || this.router.url == "/app") {
            this.routerService.routeChange(true)
        } else {
            this.routerService.routeChange(false)
        }

        if (localStorage.getItem('currentUser')) {
            return true
        }

        this.router.navigate(['/login'])
        return false
    }
    /*
    isInArray(string, array) {
        return (array.indexOf(string) > -1)
    }
    */
}
