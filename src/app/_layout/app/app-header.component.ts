import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs/Subscription';

import { AddFolderComponent, AddFileComponent } from '../../home/modals/_index';

import { FolderService, AlertService, RouterService } from '../../_services/_index';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})

export class AppHeaderComponent implements OnInit, OnDestroy {

    folder: string;
    isMainRoute: boolean;
    routerSubscription: Subscription;

    constructor(public dialog: MatDialog,
                private folderService: FolderService,
                private router: Router,
                private routerService: RouterService,
                private alertService: AlertService) { }

    ngOnInit() {
        this.router.url == '/app' ? this.isMainRoute = false : this.isMainRoute = true
        this.routerSubscription = this.routerService.getRoute().subscribe(data => {
            this.isMainRoute = data;
        })
    }

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

    addFile() {
        this.folder = this.folderService.thisFolder
        let dialogRef = this.dialog.open(AddFileComponent, { panelClass : 'dialogClass', data : this.folder })
        dialogRef.afterClosed().subscribe(result => {
            if(result.state == true) {
                this.folderService.reload(this.folder)
                this.alertService.alert.next('Le fichier ' + result.name + ' à bien été uploader')
            }
        })
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe()
    }

}
