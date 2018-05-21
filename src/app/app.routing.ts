import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/_index';

import { AppLayoutComponent } from './_layout/app/app-layout.component';
import { SiteLayoutComponent } from './_layout/site/site-layout.component';

import { LoginComponent } from './auth/_index';
import { HomeComponent } from './home/_index';
import { FilesComponent } from './home/files/_index';
import { LandingComponent } from './landing/_index';
import { MentionsComponent, CguComponent } from './landing/terms/_index';
import { ProfileComponent } from './profile/_index';

const appRoutes: Routes = [

    {
      path: 'app',
      component: AppLayoutComponent,
      children : [
          { path: '', component: HomeComponent, canActivate: [AuthGuard] , pathMatch: 'full' },
          { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      ]
    },

    {
      path: '',
      component: SiteLayoutComponent,
      children : [
          { path: '', component: LandingComponent },
          { path: 'mentions-legales', component: MentionsComponent },
          { path: 'conditions-generales-utilisation', component: MentionsComponent },
      ]
    },

    { path: 'login', component: LoginComponent},
    { path: 'file/:id', component: FilesComponent},
    // { path: 'register', component: RegisterComponent },

];

export const Router = RouterModule.forRoot(appRoutes);
