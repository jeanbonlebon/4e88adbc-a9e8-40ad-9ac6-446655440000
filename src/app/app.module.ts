import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './app.material';
import { AppComponent } from './app.component';

import { customHttpProvider } from './_helpers/_index';
import { Router } from './app.routing';

import { AuthGuard } from './_guards/_index';
import { AuthenticationService, AlertService, FolderService, UserService } from './_services/_index';

import { AppHeaderComponent, AppLayoutComponent, SiteLayoutComponent } from './_layout/_index';
import { LoginComponent } from './auth/_index';
import { HomeComponent } from './home/_index';
import { RenameComponent, AddFolderComponent, DeleteComponent, MoveComponent } from './home/modals/_index';
import { LandingComponent } from './landing/_index';
import { ProfileComponent } from './profile/_index';

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
    RenameComponent,
    AddFolderComponent,
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
    ReactiveFormsModule
  ],
  entryComponents: [
    RenameComponent,
    AddFolderComponent,
    MoveComponent,
    DeleteComponent
  ],
  providers: [
    customHttpProvider,
    AuthGuard,
    AuthenticationService,
    AlertService,
    UserService,
    FolderService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
