import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FolderService, FileService } from '../../_services/_index';

@Component({
    selector: 'delete-component',
    templateUrl: './delete.component.html'
})

export class DeleteComponent {

    constructor(public dialogRef: MatDialogRef<DeleteComponent>,
                private fb: FormBuilder,
                private folderService: FolderService,
                private fileService: FileService,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    delete() {
        if(this.data.type == 'folder') {

            this.folderService.delete(this.data.data._id).subscribe(
                (data) => this.close(true, this.data.data.name),
                (err) => this.close(false, '')
            )

        } else {

            this.fileService.delete(this.data.data._id).subscribe(
                (data) => this.close(true, this.data.data.name),
                (err) => this.close(false, '')
            )

        }
    }

    close(state: boolean, name: string) {
        this.dialogRef.close({state : state, name : name});
    }

}
