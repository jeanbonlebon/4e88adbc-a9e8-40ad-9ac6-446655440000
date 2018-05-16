import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FileType, LinkConstructor } from '../../_helpers/_index';

@Component({
    selector: 'app-watch-file-component',
    templateUrl: './watch-file.component.html'
})

export class WatchFileComponent implements OnInit {

    isImage = false;
    image: any = {};
    isVideo = false;
    video: any = {};
    isPdf = false;
    pdf: any = {};

    constructor(public dialogRef: MatDialogRef<WatchFileComponent>,
                private fileType: FileType,
                private linkConstructor: LinkConstructor,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        const link = this.linkConstructor.get(this.data.data);

        if (this.data.type === 'image') {
            this.isImage = true;
            this.image.source = link;
        } else if (this.data.type === 'video') {
            this.isVideo = true;
            this.video.source = link;
            this.video.type = this.data.data.type;
        } else if (this.data.type === 'pdf') {
            this.isPdf = true;
            this.pdf.source = link;
        }
    }

}
