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
        case 'video/rmvb':
          file.type = 'video_library'
          break;
        case 'images/jpeg' :
        case 'images/bmp' :
        case 'images/tiff' :
        case 'images/gif' :
        case 'images/png':
          file.type = 'photo_library'
          break;
        case 'audio/mp3' :
        case 'audio/wav' :
        case 'audio/wma' :
        case 'audio/webm' :
        case 'audio/flac' :
        case 'audio/x-m4a' :
          file.type = 'library_music'
          break;
        case 'application/pdf':
          file.type = 'picture_as_pdf'
          break;
        case 'application/msword':
          file.type = 'library_books'
          break;
        case 'application/zip' :
        case 'application/x-zip-compressed' :
        case 'application/rar' :
          file.type = 'archive'
          break;
        default:
          file.type = 'insert_drive_file'
          break;

        return file
    }

}
