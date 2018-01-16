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
            (data) => console.log(data),
            (err) => console.error(err),
            () => this.dialogRef.close('New Name for' + this.data._id + ' is ' +  form.value.name)
        )
    }

    close() {
        this.dialogRef.close();
    }
}
