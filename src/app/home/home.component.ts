import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/Rx';

import { Folder } from '../_models/folder';

import { FolderService, AlertService } from '../_services/_index';

import { AddFolderComponent } from './modals/_index';
import { RenameComponent } from './modals/_index';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent {
    folder : any = {};
    folders : any;
    emptyFolders : boolean;
    breadcrump : any = [];

    constructor(private folderService: FolderService, public dialog: MatDialog, private alertService: AlertService) {
        this.getDatasRoot()
    }

    public getDatasRoot() {

        let arrayRes = []

        arrayRes.push(this.folderService.getChilds(null))

        Observable.forkJoin(arrayRes).subscribe(
            (data) => {
                this.folders = data[0]
                this.folder = {}
                this.breadcrump = []
                Object.keys(this.folders).length === 0 ? this.emptyFolders = true : this.emptyFolders = false
                this.folderService.actualFolder('null')
            },
            (err) => console.error(err)
        )
    }

    public getDatas(_id: any, isReturn: boolean, isReload: boolean) {

        let arrayRes = []

        arrayRes.push(this.folderService.get(_id))
        arrayRes.push(this.folderService.getChilds(_id))

        Observable.forkJoin(arrayRes).subscribe(
            (data) => {
                this.emptyFolders == true ? this.emptyFolders = false : null
                this.folderService.actualFolder(this.folder)
                isReload == false ? this.setBreadcrump(data[0], isReturn) : null
                this.folder = data[0]
                this.folders = data[1]
            },
            (err) => console.error(err)
        )
    }

    private setBreadcrump(folder: any, isReturn: boolean) {
        if(isReturn == true) {
            let index = this.breadcrump.findIndex(x => x.name == folder.name)
            let newBreadcrump = []
            this.breadcrump.forEach(x => x.parents.includes(folder._id) == false ? newBreadcrump.push(x) : null)
            this.breadcrump = newBreadcrump
        } else {
            this.breadcrump.push(folder)
        }
    }

    public rename(data) {
        let dialogRef = this.dialog.open(RenameComponent, { panelClass : 'dialogClass', data : data })
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.getDatas(this.folder._id , false, true)
        })
    }

    public addFolder() {
        this.folder = this.folderService.thisFolder
        let dialogRef = this.dialog.open(AddFolderComponent, { panelClass : 'dialogClass', data : this.folder })
        dialogRef.afterClosed().subscribe(result => {
            if(result.state == true) {
                this.getDatasRoot()
                this.alertService.alert.next('Dossier ' + result.name + ' creer')
            }
        })
    }
}
