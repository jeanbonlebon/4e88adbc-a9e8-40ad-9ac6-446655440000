import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/_index';

import { AppLayoutComponent } from './_layout/app/app-layout.component';
import { SiteLayoutComponent } from './_layout/site/site-layout.component';

import { LoginComponent } from './auth/_index';
import { HomeComponent } from './home/_index';
import { LandingComponent } from './landing/_index';

const appRoutes: Routes = [

    {
      path: 'app',
      component: AppLayoutComponent,
      children : [
          { path: '', component: HomeComponent, canActivate: [AuthGuard] , pathMatch: 'full' },
      ]
    },

    {
      path: '',
      component: SiteLayoutComponent,
      children : [
          { path: '', component: LandingComponent },
      ]
    },

    { path: 'login', component: LoginComponent},
    //{ path: 'register', component: RegisterComponent },

];

export const Router = RouterModule.forRoot(appRoutes);
