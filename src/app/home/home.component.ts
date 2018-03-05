import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/Rx';

import { FileType } from '../_helpers/_index';

import { Folder, File } from '../_models/_index';

import { FolderService, FileService, AlertService } from '../_services/_index';

import { AddFolderComponent, RenameComponent, DeleteComponent, MoveComponent } from './modals/_index';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    folder : any = {};
    folders : any;
    files: any;
    emptyFolders : boolean;
    breadcrump : any = [];

    constructor(private folderService: FolderService,
                private fileService: FileService,
                private fileType: FileType,
                public dialog: MatDialog,
                private alertService: AlertService) {
        this.getDatasRoot()
    }

    ngOnInit() {
        this.folderService._listenReload().subscribe((folderID:any) => {
              folderID == 'null' ? this.getDatasRoot() : this.getDatas(this.folder._id , false, true)
        })
    }

    public getDatasRoot() {

        let arrayRes = []

        arrayRes.push(this.folderService.getChilds(null))
        arrayRes.push(this.fileService.get(null))

        Observable.forkJoin(arrayRes).subscribe(
            (data) => {
                this.folders = data[0]
                this.files = data[1]
                this.files.forEach(file => file = this.fileType.setFileType(file))
                this.folder = {}
                this.breadcrump = []
                this.isFolderEmpty(this.folders, this.files) ? this.emptyFolders = true : this.emptyFolders = false
                this.folderService.actualFolder('null')
            },
            (err) => console.error(err)
        )
    }

    public getDatas(_id: any, isReturn: boolean, isReload: boolean) {

        let arrayRes = []

        arrayRes.push(this.folderService.get(_id))
        arrayRes.push(this.folderService.getChilds(_id))
        arrayRes.push(this.fileService.get(_id))

        Observable.forkJoin(arrayRes).subscribe(
            (data) => {
                this.emptyFolders == true ? this.emptyFolders = false : null
                isReload == false ? this.setBreadcrump(data[0], isReturn) : null
                this.folder = data[0]
                this.folders = data[1]
                this.files = data[2]
                this.files.forEach(file => file = this.fileType.setFileType(file))
                this.isFolderEmpty(this.folders, this.files) ? this.emptyFolders = true : this.emptyFolders = false
                this.folderService.actualFolder(this.folder._id)
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

    private isFolderEmpty(folders, files) {
        if(Object.keys(folders).length === 0 && Object.keys(files).length === 0) {
            return true
        }
        return false
    }

    public rename(data) {
        let dialogRef = this.dialog.open(RenameComponent, { panelClass : 'dialogClass', data : data })
        dialogRef.afterClosed().subscribe(result => {
            if(result && result.state == true) {
                this.realodAfterAction('Le dossier à bien été renommé')
            }
        })
    }

    public move(data: any, type: string) {
        let dialogRef = this.dialog.open(MoveComponent, { panelClass : 'dialogClass', data : { data : data, type : type } })
        dialogRef.afterClosed().subscribe(result => {
            if(result && result.state == true) {
                this.realodAfterAction(result.name)
            }
        })
    }

    public delete(data: any, type: string) {
        let dialogRef = this.dialog.open(DeleteComponent, { panelClass : 'dialogClass', data : { data : data, type : type } })
        dialogRef.afterClosed().subscribe(result => {
            if(result && result.state == true) {
                this.realodAfterAction(result.name)
            }
        })
    }

    public addFolder() {
        this.folder = this.folderService.thisFolder
        let dialogRef = this.dialog.open(AddFolderComponent, { panelClass : 'dialogClass', data : this.folder })
        dialogRef.afterClosed().subscribe(result => {
            if(result && result.state == true) {
                this.realodAfterAction('Le dossier ' + result.name + ' creer')
            }
        })
    }

    private realodAfterAction(message: string) {
        Object.keys(this.folder).length === 0 ? this.getDatasRoot() : this.getDatas(this.folder._id , false, true)
        this.alertService.alert.next(message)
    }
}
