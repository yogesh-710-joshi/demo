import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {AdminComponent} from './admin/admin.component'
import {AuthGuardService} from './guards/auth-guard.service';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', 
  redirectTo: "login",
  pathMatch:"full"
  },
  { path: 'login', 
  component: SignInComponent 
},
{
  path: 'sign-up',
  component: SignUpComponent
},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate : [AuthGuardService] },  
 /*  {path: 'admin',component: AdminComponent} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
