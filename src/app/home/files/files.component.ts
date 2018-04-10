import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FileType, LinkConstructor } from '../../_helpers/_index';

import { File } from '../../_models/_index';
import { FileService } from '../../_services/_index';

@Component({
    selector: 'files',
    templateUrl: './files.component.html'
})

export class FilesComponent implements OnInit, OnDestroy {

    private sub: any;
    isImage: boolean = false;
    isVideo: boolean = false;

    image: any = {};
    video: any = {};

    constructor(private route: ActivatedRoute,
                private fileType: FileType,
                private linkConstructor: LinkConstructor,
                private fileService: FileService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if(params['id']) {
                this.getFile(params['id'])
            }
        })
    }

    private getFile(id: any) {
        this.fileService.getOne(id).subscribe(
            (data) => this.displayFile(data),
            (err) => console.error(err)
        )
    }

    private displayFile(file: File) {
        let type = this.fileType.checkFileType(file)
        let link = this.linkConstructor.get(file)
        console.log(type, link)

        if(type == 'image')
        {
            this.isImage = true
            this.image.source = link
        }
        else if(type == 'video')
        {
            this.isVideo = true
            this.video.source = link
            this.video.type = file.type
        }

    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }
}
