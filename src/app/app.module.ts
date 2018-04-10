import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { MaterialModule } from './app.material';
import { AppComponent } from './app.component';

import { TokenInterceptorProvider, ErrorInterceptorProvider, FileType, LinkConstructor } from './_helpers/_index';
import { Router } from './app.routing';

import { AuthGuard } from './_guards/_index';
import { AuthenticationService, AlertService, FolderService, FileService, UserService, RouterService } from './_services/_index';

import { AppHeaderComponent, AppLayoutComponent, SiteLayoutComponent } from './_layout/_index';
import { LoginComponent } from './auth/_index';
import { HomeComponent } from './home/_index';
import { FilesComponent } from './home/files/_index';
import { RenameComponent, AddFolderComponent, DeleteComponent, MoveComponent, AddFileComponent, WatchFileComponent } from './home/modals/_index';
import { LandingComponent } from './landing/_index';
import { ProfileComponent } from './profile/_index';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppHeaderComponent,
    AppLayoutComponent,
    SiteLayoutComponent,
    LandingComponent,
    ProfileComponent,
    HomeComponent,
    FilesComponent,
    RenameComponent,
    AddFolderComponent,
    AddFileComponent,
    WatchFileComponent,
    MoveComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    HttpModule,
    HttpClientModule,
    Router,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    PdfViewerModule
  ],
  entryComponents: [
    RenameComponent,
    AddFolderComponent,
    AddFileComponent,
    WatchFileComponent,
    MoveComponent,
    DeleteComponent
  ],
  providers: [
    TokenInterceptorProvider,
    ErrorInterceptorProvider,
    FileType,
    LinkConstructor,
    AuthGuard,
    AuthenticationService,
    AlertService,
    RouterService,
    UserService,
    FolderService,
    FileService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
