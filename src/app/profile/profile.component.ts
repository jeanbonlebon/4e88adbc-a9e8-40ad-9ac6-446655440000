import { Component } from '@angular/core';

import { UserService, RouterService } from '../_services/_index';

import { User } from '../_models/user';

//const maxStorage = 4026531840;
const maxStorage = 32212254720;

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent {

    user: User;
    myStorage: number;
    dataLoaded: boolean = false;

    constructor(private userService: UserService) {
        this.getUserData()
    }

    private getUserData() {
        this.userService.get().subscribe(
            (data) => {
                this.user = this.buildUser(data)
                this.myStorage = Math.round((this.user.space_available/maxStorage)*100)
                this.dataLoaded = true
                console.log(this.myStorage)
                console.log(this.convertBytes(this.user.space_available))
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

    private convertBytes(x) {
        const units = ['Bytes', 'KB', 'MB', 'GB']
        let l = 0, n = parseInt(x, 10) || 0

        while(n >= 1024 && ++l)
            n = n/1024

        return(n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l])
    }
}
