import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HomeComponent } from '../../home/_index';
import { AddFolderComponent } from '../../home/modals/_index';

@Component({
    selector: 'app-layout',
    templateUrl: './app-layout.component.html'
})

export class AppLayoutComponent {

    @ViewChild(HomeComponent) home: HomeComponent;

    constructor(public dialog: MatDialog) {}

    addFolder() {
        let dialogRef = this.dialog.open(AddFolderComponent, { panelClass : 'dialogClass', data : this.home.folder });
    }

}
