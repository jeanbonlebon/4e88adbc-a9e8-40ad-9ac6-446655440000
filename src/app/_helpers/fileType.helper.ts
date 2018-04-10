import { Injectable } from '@angular/core';
import { File } from '../_models/_index';

@Injectable()
export class FileType {

    setFileType (file: File) {

        switch (file.type) {
          case 'video/avi' :
          case 'video/wma' :
          case 'video/mov' :
          case 'video/wma' :
          case 'video/mp4' :
          case 'video/ogg' :
          case 'video/webm' :
          case 'video/rmvb':
            file.logoType = 'video_library'
            break;
          case 'images/jpeg' :
          case 'images/jpg' :
          case 'images/bmp' :
          case 'images/tiff' :
          case 'images/gif' :
          case 'images/png' :
          case 'image/png' :
            file.logoType = 'photo_library'
            break;
          case 'audio/mp3' :
          case 'audio/wav' :
          case 'audio/wma' :
          case 'audio/webm' :
          case 'audio/flac' :
          case 'audio/x-m4a' :
            file.logoType = 'library_music'
            break;
          case 'application/pdf':
            file.logoType = 'picture_as_pdf'
            break;
          case 'application/msword':
            file.logoType = 'library_books'
            break;
          case 'application/zip' :
          case 'application/x-zip-compressed' :
          case 'application/rar' :
            file.logoType = 'archive'
            break;
          default:
            file.logoType = 'insert_drive_file'
            break;
        }

        return file
    }

    checkFileType(file: File) {

        let type: string;

        switch (file.type) {
          case 'video/mp4' :
          case 'video/ogg' :
          case 'video/webm' :
            type = 'video'
            break;
          case 'images/jpeg' :
          case 'images/jpg' :
          case 'images/png' :
          case 'image/png' :
            type = 'image'
            break;
          case 'application/pdf' :
            type = 'pdf'
            break;
          default:
            type = 'download'
            break;
        }

        return type

    }
}
