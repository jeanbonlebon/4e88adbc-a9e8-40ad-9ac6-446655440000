import { Component } from '@angular/core';

import { UserService, RouterService } from '../_services/_index';

import { User } from '../_models/user';

const maxStorage = 4026531840;

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent {

    user: User;
    myStorage: number = 60;
    dataLoaded: boolean = false;

    constructor(private userService: UserService) {
        this.getUserData()
    }

    private getUserData() {
        this.userService.get().subscribe(
            (data) => {
                this.user = this.buildUser(data)
                //this.myStorage = (maxStorage-this.user.space_available)*100/this.user.space_available
                this.dataLoaded = true
                console.log(this.myStorage)
            },
            (err) => console.error(err)
        )
    }

    private buildUser(data) {
        let user = new User()
        user._id = data._id
        user.email = data.email
        user.firstName = data.profile.firstName
        user.lastName = data.profile.lastName
        user.space_available = data.space_available

        return user
    }
}
