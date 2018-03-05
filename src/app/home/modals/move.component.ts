import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Folder } from '../../_models/folder';

import { FolderService } from '../../_services/_index';

@Component({
    selector: 'move-component',
    templateUrl: './move.component.html'
})

export class MoveComponent {

    folders: Folder[];
    toFolder: Folder;

    isRoot: boolean = true;
    isEmpty: boolean;

    isDisabled = false;

    constructor(public dialogRef: MatDialogRef<MoveComponent>,
                private fb: FormBuilder,
                private folderService: FolderService,
                @Inject(MAT_DIALOG_DATA) public data: any) { this.getDatasRoot(null) }


    public getDatasRoot(parent: any) {
        this.folderService.getChilds(parent).subscribe(
            (data) => {
                this.folders = data
                console.log(this.folders)
                data.length == 0 ? this.isEmpty = true : this.isEmpty = false
                parent == null ? this.isRoot = true : this.isRoot = false
                this.isDisabled = true
            },
            (err) => console.error(err)
        )
    }

    public selectedFolder(folder) {
        this.isDisabled = false
        this.toFolder ? this.toFolder.active = false : null
        folder.active = true
        this.toFolder = folder
    }

    public move() {
        console.log(this.data._id, this.toFolder._id)
        if(this.data.type == 'folder') {

          this.folderService.move(this.data.data._id, {folder : this.toFolder._id}).subscribe(
            (data) => this.close(true, 'Le dossier ' + this.data.data.name + ' à bien été déplacé dans le dossier ' + this.toFolder.name),
            (err) => this.close(false, '')
          )

        } else {
          console.log('move file')
        }

    }

    public close(state: boolean, name: string) {
        this.dialogRef.close({state : state, name : name})
    }

}
