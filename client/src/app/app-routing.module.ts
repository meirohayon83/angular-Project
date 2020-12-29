
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListTeachersComponent } from './list-teachers/list-teachers.component';
import { PostComponent } from './post/post.component';
import { AuthGuard } from './auth.guard';
import { ForgetComponent } from './forget/forget.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import {HomeComponent} from './home/home.component';
import { ConfirmComponent } from './confirm/confirm.component';
import {UpdateComponent} from './update/update.component'
import { UserPageComponent } from './user-page/user-page.component';



const routes: Routes = [

  // all the path in localhost 4200
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'

  },
  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
   path: 'login',
   component: LoginComponent
  },
  {
   
    path: 'confir/:token',
    component: ConfirmComponent

  },
  {
    path: 'list',
    component:ListTeachersComponent,
    canActivate:[AuthGuard]

  },

  {
    path: 'post',
    component:PostComponent,
    canActivate:[AuthGuard]

  },
  {
    path: 'forget',
    component:ForgetComponent
  },
  {
    path: 'forget/pass/:token',
    component:ChangePassComponent
  },
  {
    path:'update/:id',
    component:UpdateComponent
  },
  {
    path: 'userPage/:id',
    component:UserPageComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
