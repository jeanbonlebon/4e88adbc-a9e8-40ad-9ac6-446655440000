import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'add-file-component',
    templateUrl: './add-file.component.html'
})

export class AddFileComponent implements OnInit {

    addFileForm: FormGroup;
    loading: boolean = false;

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(public dialogRef: MatDialogRef<AddFileComponent>,
                private fb: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.addFileForm = this.fb.group ({
            file : null
        })
    }

    onFileChange(event) {
        if(event.target.files.length > 0) {
            let file = event.target.files[0]
            this.addFileForm.get('file').setValue(file)
        }
    }

    private prepareSave(): any {
        let input = new FormData()
        input.append('file', this.addFileForm.get('file').value)
        return input
    }

    save() {
        const formModel = this.prepareSave()
        this.loading = true
        console.log('service')
    }


}
