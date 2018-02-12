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

    constructor(public dialogRef: MatDialogRef<MoveComponent>,
                private fb: FormBuilder,
                private folderService: FolderService,
                @Inject(MAT_DIALOG_DATA) public data: any) { this.getDatasRoot() }


    public getDatasRoot() {
        this.folderService.getChilds(null).subscribe(
            (data) => this.folders = data,
            (err) => console.error(err)
        )
    }

    public selectedFolder(folder) {
        this.toFolder ? this.toFolder.active = false : null
        folder.active = true
        this.toFolder = folder
    }

    public close(state: boolean, name: string) {
        this.dialogRef.close({state : state, name : name})
    }

}
