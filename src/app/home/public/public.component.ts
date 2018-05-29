import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { saveAs } from 'file-saver';

import { FileType } from '../../_helpers/_index';
import { File, Folder } from '../../_models/_index';
import { FileService, FolderService } from '../../_services/_index';

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html'
})

export class PublicComponent implements OnInit, OnDestroy {

    private sub: any;
    limitFolder: Folder;
    folder: any;
    folders: any;
    files: any;
    breadcrump = [];

    constructor(private route: ActivatedRoute,
                private fileType: FileType,
                private router: Router,
                private fileService: FileService,
                private folderService: FolderService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.checkPublic(params['id']);
            }
        });
    }

    private checkPublic(id: any) {
        this.folderService.isShared(id).subscribe(
            (data) => {
                if (data) {
                    this.limitFolder = data;
                    this.getDatas(this.limitFolder._id.toString(), false, true);
                } else {
                    this.router.navigate(['/']);
                }
            },
            (err) => console.error(err)
        );
    }

    private getDatas(_id: string, isReturn: boolean, isRoot: boolean) {

        const arrayRes = [];

        arrayRes.push(this.folderService.get(_id));
        arrayRes.push(this.folderService.getChilds(_id));
        arrayRes.push(this.fileService.get(_id));

        Observable.forkJoin(arrayRes).subscribe(
            (data) => {
                this.folder = data[0];
                this.folders = data[1];
                this.files = data[2];
                if (isRoot !== true) {
                    this.setBreadcrump(this.folder, isReturn);
                } else {
                    this.breadcrump = [];
                }
                this.files.forEach(file => file = this.fileType.setFileType(file));
            },
            (err) => console.error(err)
        );
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

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
