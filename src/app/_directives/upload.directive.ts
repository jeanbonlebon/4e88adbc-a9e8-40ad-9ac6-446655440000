import { Component, OnInit } from '@angular/core';
import { HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';

import { Toast } from '../_models/_index';

import { FileService, FolderService } from '../_services/_index';

@Component({
    selector: 'app-upload-alert',
    templateUrl: './upload.directive.html'
})

export class UploadComponent implements OnInit {
    alerts: any[] = [];

    constructor(private fileService: FileService, private folderService: FolderService) { }

    ngOnInit() {
        this.fileService.getAlert().subscribe((data: Toast) => {
            this.addUpload(data);
        });
    }

    private addUpload(data: Toast) {

        data.id = this.alerts.length;
        data.percentage = 0;
        data.isDone = false;

        this.alerts.push(data);

        this.fileService.create(data.file, data.folder_id).subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log(data, 'Request sent!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Server send ok');
              break;
            case HttpEventType.UploadProgress:
              const percentDone = Math.round(100 * event.loaded / event.total);
              this.alerts[data.id].percentage = percentDone;
              break;
            case HttpEventType.Response:
              this.alerts[data.id].isDone = true;
              this.folderService.reload(data.folder_id);
              break;
          }
        });

    }

    removeUpload(alert: Toast) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }
}
