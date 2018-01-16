import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddFolderComponent } from '../../home/modals/_index';

import { FolderService } from '../../_services/_index';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})

export class AppHeaderComponent {

    folder: string;

    constructor(public dialog: MatDialog, private folderService: FolderService) {}

    addFolder() {
        this.folder = this.folderService.thisFolder
        let dialogRef = this.dialog.open(AddFolderComponent, { panelClass : 'dialogClass', data : this.folder });
    }

}
