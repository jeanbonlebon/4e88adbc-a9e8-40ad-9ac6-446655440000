import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Folder } from '../../_models/folder';

import { FolderService, FileService } from '../../_services/_index';

@Component({
    selector: 'app-move-component',
    templateUrl: './move.component.html'
})

export class MoveComponent {

    folders: Folder[];
    toFolder: Folder;

    isRoot = true;
    isEmpty: boolean;
    rootActive = false;

    isDisabled = false;

    constructor(public dialogRef: MatDialogRef<MoveComponent>,
                private fb: FormBuilder,
                private folderService: FolderService,
                private fileService: FileService,
                @Inject(MAT_DIALOG_DATA) public data: any) { this.getDatasRoot(null); }


    public getDatasRoot(parent: any) {
        this.folderService.getChilds(parent).subscribe(
            (data) => {
                this.folders = data;
                data.length === 0 ? this.isEmpty = true : this.isEmpty = false;
                parent == null ? this.isRoot = true : this.isRoot = false;
                this.isDisabled = true;
            },
            (err) => console.error(err)
        );
    }

    public selectedFolder(folder) {
        if (folder === 'null') {
            if (this.toFolder) {
                this.toFolder.active = false;
            }
            this.rootActive = true;
            this.toFolder = null;
        } else {
            this.rootActive = false;
            if (this.toFolder) {
                this.toFolder.active = false;
            }
            folder.active = true;
            this.toFolder = folder;
        }
        this.isDisabled = false;
    }

    public move() {
        let moveTo; this.toFolder == null ? moveTo = 'null' : moveTo = this.toFolder._id;

        if (this.data.type === 'folder') {

          this.folderService.move(this.data.data._id, {folder : moveTo}).subscribe(
            (data) => this.close(true, 'Le dossier ' + this.data.data.name + ' à bien été déplacé'),
            (err) => this.close(false, '')
          );

        } else {

          this.fileService.move(this.data.data._id, {folder : moveTo}).subscribe(
            (data) => this.close(true, 'Le fichier ' + this.data.data.name + ' à bien été déplacé'),
            (err) => this.close(false, '')
          );

        }

    }

    public close(state: boolean, name: string) {
        this.dialogRef.close({state : state, name : name});
    }

}
