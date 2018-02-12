import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AddFolderComponent } from '../../home/modals/_index';

import { FolderService, AlertService } from '../../_services/_index';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})

export class AppHeaderComponent implements OnInit {

    folder: string;

    constructor(public dialog: MatDialog,
                private folderService: FolderService,
                private router: Router,
                private alertService: AlertService) { }

    ngOnInit() { }

    addFolder() {
        this.folder = this.folderService.thisFolder
        let dialogRef = this.dialog.open(AddFolderComponent, { panelClass : 'dialogClass', data : this.folder })
        dialogRef.afterClosed().subscribe(result => {
            if(result.state == true) {
                this.folderService.reload(this.folder)
                this.alertService.alert.next('Dossier ' + result.name + ' creer')
            }
        })
    }

}
