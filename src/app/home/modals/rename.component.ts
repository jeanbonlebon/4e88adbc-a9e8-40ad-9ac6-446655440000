import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FolderService } from '../../_services/_index';

const startRegEx = '^(?!^';
const endRegEx = '$).*';

@Component({
    selector: 'rename-component',
    templateUrl: './rename.component.html'
})

export class RenameComponent implements OnInit {

    renameForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<RenameComponent>,
                private fb: FormBuilder,
                private folderService: FolderService,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.renameForm = this.fb.group ({
            name : [this.data.name, [Validators.required, Validators.pattern(new RegExp(startRegEx + this.data.name + endRegEx))]]
        })
    }

    save(form) {
        this.folderService.rename(this.data._id, {name : form.value.name} ).subscribe(
            (data) => this.close(true, form.value.name),
            (err) => this.close(false, '')
        )
    }

    close(state: boolean, name: string) {
        this.dialogRef.close({state : state, name : name});
    }
}
