import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'add-folder-component',
    templateUrl: './add-folder.component.html'
})

export class AddFolderComponent implements OnInit {

    addFolderForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<AddFolderComponent>,
                private fb: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.addFolderForm = this.fb.group ({
            name : ['']
        })
    }

    save(form) {
        console.log(form)
    }
}
