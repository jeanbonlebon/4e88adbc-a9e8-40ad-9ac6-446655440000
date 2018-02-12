import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FolderService } from '../../_services/_index';

@Component({
    selector: 'move-component',
    templateUrl: './move.component.html'
})

export class MoveComponent {

    toFolder: any;

    constructor(public dialogRef: MatDialogRef<MoveComponent>,
                private fb: FormBuilder,
                private folderService: FolderService,
                @Inject(MAT_DIALOG_DATA) public data: any) { }


    selectedFolder() {

    }

}
