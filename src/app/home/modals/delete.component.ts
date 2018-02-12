import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FolderService } from '../../_services/_index';

@Component({
    selector: 'delete-component',
    templateUrl: './delete.component.html'
})

export class DeleteComponent {

    constructor(public dialogRef: MatDialogRef<DeleteComponent>,
                private fb: FormBuilder,
                private folderService: FolderService,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    delete() {
        this.folderService.delete(this.data._id).subscribe(
            (data) => this.close(true, this.data.name),
            (err) => this.close(false, '')
        )
    }

    close(state: boolean, name: string) {
        this.dialogRef.close({state : state, name : name});
    }

}
