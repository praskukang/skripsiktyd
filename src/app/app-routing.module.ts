import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'sidemenu', loadChildren: './pages/sidemenu/sidemenu.module#SidemenuPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'addinfo', loadChildren: './pages/addinfo/addinfo.module#AddinfoPageModule' },
  { path: 'addinfo/:id', loadChildren: './pages/addinfo/addinfo.module#AddinfoPageModule' },
  { path: 'addkas', loadChildren: './pages/addkas/addkas.module#AddkasPageModule' },
  { path: 'addkas/:id', loadChildren: './pages/addkas/addkas.module#AddkasPageModule' },
  { path: 'edituser', loadChildren: './pages/edituser/edituser.module#EdituserPageModule' },
  { path: 'edituser/:id', loadChildren: './pages/edituser/edituser.module#EdituserPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'reset', loadChildren: './pages/reset/reset.module#ResetPageModule' },
//  { path: 'createprofile', loadChildren: './pages/createprofile/createprofile.module#CreateprofilePageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
