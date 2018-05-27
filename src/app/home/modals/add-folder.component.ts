import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FolderService } from '../../_services/_index';

@Component({
    selector: 'app-add-folder-component',
    templateUrl: './add-folder.component.html'
})

export class AddFolderComponent implements OnInit {

    addFolderForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<AddFolderComponent>,
                private fb: FormBuilder,
                private folderService: FolderService,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.addFolderForm = this.fb.group ({
            name : ['']
        });
    }

    save(form) {
        this.folderService.create({ name : form.controls.name.value, parent : this.data }).subscribe(
            (data) => this.close(true, form.controls.name.value),
            (err) => this.close(false, '')
        );
    }

    close(state: boolean, name: string) {
        this.dialogRef.close({state : state, name : name});
    }
}
