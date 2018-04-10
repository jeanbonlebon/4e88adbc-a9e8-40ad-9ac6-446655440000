import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FolderService, FileService } from '../../_services/_index';

const startRegEx = '^(?!^';
const endRegEx = '$).*';

@Component({
    selector: 'rename-component',
    templateUrl: './rename.component.html'
})

export class RenameComponent implements OnInit {

    renameForm: FormGroup;
    name: string;
    extension: string;

    constructor(public dialogRef: MatDialogRef<RenameComponent>,
                private fb: FormBuilder,
                private folderService: FolderService,
                private fileService: FileService,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.data.type == 'folder' ? this.name = this.data.data.name : this.setFileName(this.data.data.name)
        this.renameForm = this.fb.group ({
            name : [this.name, [
              Validators.required,
              Validators.pattern(new RegExp(startRegEx + this.name + endRegEx))
            ]]
        })
    }

    private setFileName(dataName: string) {
        let lastIndex = dataName.lastIndexOf('.')
        this.name = dataName.slice(0, lastIndex)
        this.extension = dataName.slice(lastIndex)
    }

    save(form) {
        if(this.data.type == 'folder') {

            this.folderService.rename(this.data.data._id, { name : form.value.name }).subscribe(
                (data) => this.close(true, 'dossier'),
                (err) => this.close(false, '')
            )

        } else {
            let newName = form.value.name + this.extension
            this.fileService.rename(this.data.data._id, { name : newName }).subscribe(
                (data) => this.close(true, 'fichier'),
                (err) => this.close(false, '')
            )

        }
    }

    close(state: boolean, name: string) {
        this.dialogRef.close({state : state, name : name});
    }
}
