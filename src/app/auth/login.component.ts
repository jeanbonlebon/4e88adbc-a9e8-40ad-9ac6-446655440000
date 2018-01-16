import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../_services/_index';
import { HttpClient } from '@angular/common/http';

const EMailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    hide = true;
    loginForm: FormGroup;

    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        public http: HttpClient,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.loginForm = this.fb.group ({
            email : ['', [Validators.required, Validators.pattern(EMailPattern)]],
            password : ['', Validators.required]
        })

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/app';
    }

    loginFb() {
        this.authenticationService.loginFacebook()
            .then(() => this.router.navigate(['/app']))
            .catch((err) => console.error(err))
    }

    login(form) {
        this.authenticationService.login(form.value.email, form.value.password).subscribe(
            (data) => this.router.navigate(['/app']),
            (err) => console.error(err)
        );
    }

}
