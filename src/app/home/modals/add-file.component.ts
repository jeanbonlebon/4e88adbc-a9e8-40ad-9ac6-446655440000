import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FileService } from '../../_services/_index';

@Component({
    selector: 'app-add-file-component',
    templateUrl: './add-file.component.html'
})

export class AddFileComponent implements OnInit {

    addFileForm: FormGroup;
    loading = false;

    isNewName = false;

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(public dialogRef: MatDialogRef<AddFileComponent>,
                private fb: FormBuilder,
                public fileService: FileService,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.addFileForm = this.fb.group ({
            file : null,
            folder : this.data,
            wantName : false,
            name : ''
        });
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.addFileForm.get('file').setValue(file);
        }
    }

    private prepareSave(): any {
        const input = new FormData();
        const file = this.addFileForm.value.file;

        if (this.addFileForm.get('name').value !== '' && this.isNewName === true) {
            const extension = file.name.split('.');
            const newName = this.addFileForm.get('name').value + '.' + extension[extension.length - 1];
            input.set('file', file, newName);
        } else {
            input.set('file', file);
        }

        return input;
    }

    save() {
        const formModel = this.prepareSave();
        this.loading = true;
        const file = formModel.getAll('file');
        console.log(formModel, this.addFileForm.get('folder').value);
        this.fileService.startUpload(formModel, this.addFileForm.get('folder').value, file[0].name);
        this.close(false, '');
        // this.close(true, file[0].name)

/*
        this.fileService.create(formModel, this.addFileForm.get('folder').value).subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request sent!');
              break;
            case HttpEventType.ResponseHeader:
              this.close(true, file[0].name)
              break;
            case HttpEventType.DownloadProgress:
              //const kbLoaded = Math.round(event.loaded / 1024);
              //console.log(`Download in progress! ${ kbLoaded }Kb loaded`);
              break;
            case HttpEventType.UploadProgress:
              //const kbUploaded = Math.round(event.loaded / 1024);
              //console.log(`Download in progress! ${ kbUploaded }Kb uploaded`);
              const percentDone = Math.round(100 * event.loaded / event.total);
              console.log(`File is ${percentDone}% uploaded.`);
            case HttpEventType.Response:
              //console.log('😺 Done!');
          }
        })
*/
    }

    close(state: boolean, name: string) {
        this.dialogRef.close({state : state, name : name});
    }

}
