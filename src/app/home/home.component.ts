import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { environment as env } from '../../environments/environment';

import { saveAs } from 'file-saver';

import { FileType, LinkConstructor } from '../_helpers/_index';

import { Folder, File } from '../_models/_index';

import { FolderService, FileService, AlertService } from '../_services/_index';

import { AddFolderComponent, AddFileComponent, RenameComponent, DeleteComponent, MoveComponent, WatchFileComponent } from './modals/_index';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    folder: any = {};
    folders: any;
    files: any;
    emptyFolders: boolean;
    breadcrump: any = [];

    layoutGrid = false;

    constructor(private folderService: FolderService,
                private fileService: FileService,
                private fileType: FileType,
                private linkConstructor: LinkConstructor,
                private router: Router,
                public dialog: MatDialog,
                private alertService: AlertService) {
        this.getDatasRoot();
    }

    ngOnInit() {
        this.folderService._listenReload().subscribe((folderID: any) => {
              folderID === 'null' ? this.getDatasRoot() : this.getDatas(this.folder._id , false, true);
        });
    }

    public getDatasRoot() {

        const arrayRes = [];

        arrayRes.push(this.folderService.getChilds(null));
        arrayRes.push(this.fileService.get(null));

        Observable.forkJoin(arrayRes).subscribe(
            (data) => {
                this.folders = data[0];
                this.files = data[1];
                this.files.forEach(file => file = this.fileType.setFileType(file));
                this.folder = {};
                this.breadcrump = [];
                this.isFolderEmpty(this.folders, this.files) ? this.emptyFolders = true : this.emptyFolders = false;
                this.folderService.actualFolder('null');
            },
            (err) => console.error(err)
        );
    }

    public getDatas(_id: any, isReturn: boolean, isReload: boolean) {

        const arrayRes = [];
        arrayRes.push(this.folderService.get(_id));
        arrayRes.push(this.folderService.getChilds(_id));
        arrayRes.push(this.fileService.get(_id));

        Observable.forkJoin(arrayRes).subscribe(
            (data) => {
                if (this.emptyFolders === true) {
                    this.emptyFolders = false;
                }
                if (isReload === false) {
                    this.setBreadcrump(data[0], isReturn);
                }
                this.folder = data[0];
                this.folders = data[1];
                this.files = data[2];
                this.files.forEach(file => file = this.fileType.setFileType(file));
                this.isFolderEmpty(this.folders, this.files) ? this.emptyFolders = true : this.emptyFolders = false;
                this.folderService.actualFolder(this.folder._id);
            },
            (err) => console.error(err)
        );
    }

    private setBreadcrump(folder: any, isReturn: boolean) {
        if (isReturn === true) {
            const index = this.breadcrump.findIndex(x => x.name === folder.name);
            const newBreadcrump = [];
            this.breadcrump.forEach(x => x.parents.includes(folder._id) === false ? newBreadcrump.push(x) : null);
            this.breadcrump = newBreadcrump;
        } else {
            this.breadcrump.push(folder);
        }
    }

    private isFolderEmpty(folders, files) {
        if (Object.keys(folders).length === 0 && Object.keys(files).length === 0) {
            return true;
        }
        return false;
    }

    public setLayout(isGrid: boolean) {
        isGrid === true ? this.layoutGrid = true : this.layoutGrid = false;
        this.realodAfterAction(null);
    }

    public display(file: File) {
        const type = this.fileType.checkFileType(file);
        switch (type) {
          case 'image' :
            this.dialog.open(WatchFileComponent, { panelClass : 'dialogFileImg', data : { data : file, type : type } });
            break;
          case 'video' :
            this.dialog.open(WatchFileComponent, { panelClass : 'dialogFileVideo', data : { data : file, type : type } });
            break;
          case 'pdf' :
            this.dialog.open(WatchFileComponent, { panelClass : 'dialogFilePdf', data : { data : file, type : type } });
            break;
          default:
            this.downloadFile(file);
            break;
        }
    }

    public rename(data: any, type: string) {
        const dialogRef = this.dialog.open(RenameComponent, { panelClass : 'dialogClass', data : { data : data, type : type } });
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.state === true) {
                this.realodAfterAction('Le ' + result.name + ' à bien été renommé');
            }
        });
    }

    public move(data: any, type: string) {
        const dialogRef = this.dialog.open(MoveComponent, { panelClass : 'dialogClass', data : { data : data, type : type } });
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.state === true) {
                this.realodAfterAction(result.name);
            }
        });
    }

    public share(folder: Folder, status: string) {
        this.folderService.share(folder._id, status).subscribe(
            (data) => {
                this.realodAfterAction('Le dossier ' + folder.name + ' a été partagé publiquement');
            },
            (err) => console.error(err)
        );
    }

    public copyLink(_id: string) {
        const event = (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', env.baseUrl + '/public/' + _id);
            e.preventDefault();
            document.removeEventListener('copy', event);
        };
        document.addEventListener('copy', event);
        document.execCommand('copy');
    }

    public downloadFile(file: File) {
      this.fileService.download(file._id).subscribe(
          (data) => {
              const blob = new Blob([data], { type: file.type });
              saveAs(blob, file.name);
          },
          (err) => console.error(err)
       );
    }

    public downloadFolder(folder: Folder) {
      this.folderService.download(folder._id).subscribe(
          (data) => {
              const blob = new Blob([data], { type: 'application/x-zip-compressed' });
              saveAs(blob, folder.name);
          },
          (err) => console.error(err)
       );
    }

    public delete(data: any, type: string) {
        const dialogRef = this.dialog.open(DeleteComponent, { panelClass : 'dialogClass', data : { data : data, type : type } });
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.state === true) {
                this.realodAfterAction(result.name);
            }
        });
    }

    public addFolder() {
        const folder = this.folderService.thisFolder;
        const dialogRef = this.dialog.open(AddFolderComponent, { panelClass : 'dialogClass', data : folder });
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.state === true) {
                this.folderService.reload(this.folder);
                this.alertService.alert.next('Dossier ' + result.name + ' creer');
            }
        });
    }

    addFile() {
        const folder = this.folderService.thisFolder;
        const dialogRef = this.dialog.open(AddFileComponent, { panelClass : 'dialogClass', data : folder });
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.state === true) {
                this.folderService.reload(this.folder);
                this.alertService.alert.next('Le fichier ' + result.name + ' à bien été uploader');
            }
        });
    }

    private realodAfterAction(message: string) {
        Object.keys(this.folder).length === 0 ? this.getDatasRoot() : this.getDatas(this.folder._id , false, true);
        if (message) {
            this.alertService.alert.next(message);
        }
    }
}
