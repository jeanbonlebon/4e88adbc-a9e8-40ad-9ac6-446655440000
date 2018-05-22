import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordValidation } from '../_helpers/_index';
import { AuthenticationService, AlertService } from '../_services/_index';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line:max-line-length
const EMailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    hide = true;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.registerForm = this.fb.group ({
            prenom : ['', Validators.required],
            nom : ['', Validators.required],
            email : ['', [Validators.required, Validators.pattern(EMailPattern)]],
            password : ['', Validators.required],
            confirmPassword: ['', Validators.required],
            accept_cgu : ['', Validators.required]
        }, {
            validator: PasswordValidation.MatchPassword
        });
    }

    register(form) {
        console.log(form);
        const dataRegister = {
            email: form.value.email,
            password: form.value.email,
            firstName: form.value.prenom,
            lastName: form.value.nom
        };
        this.authenticationService.register(dataRegister).subscribe(
            (data) => {
                this.router.navigate(['/app']);
                this.alertService.alert.next('Bienvenue ' + data.user.email);
            },
            (err) => console.error(err)
        );
    }
}
