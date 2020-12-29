// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { RegisterComponent } from './register/register.component';
// import { PostComponent } from './post/post.component';
// import { LoginComponent } from './login/login.component';
// import { ListTeachersComponent } from './list-teachers/list-teachers.component';
// import { HomeComponent } from './home/home.component';
// import { ForgetComponent } from './forget/forget.component';
// import { ConfirmComponent } from './confirm/confirm.component';
// import { ChangePassComponent } from './change-pass/change-pass.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// @NgModule({
//   declarations: [
//     AppComponent,
//     RegisterComponent,
//     PostComponent,
//     LoginComponent,
//     ListTeachersComponent,
//     HomeComponent,
//     ForgetComponent,
//     ConfirmComponent,
//     ChangePassComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }











import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule ,ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListTeachersComponent } from './list-teachers/list-teachers.component';
import { AuthService } from './auth.service';
import { PostComponent } from './post/post.component';
import { PostService } from './post.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { ForgetComponent } from './forget/forget.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { HomeComponent } from './home/home.component';
import { ConfirmComponent } from './confirm/confirm.component';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { UpdateComponent } from './update/update.component';
import { UserPageComponent } from './user-page/user-page.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmPostComponent } from './confirm-post/confirm-post.component';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';

 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ListTeachersComponent,
    PostComponent,
    ForgetComponent,
    ChangePassComponent,
    HomeComponent,
    ConfirmComponent,
    UpdateComponent,
    UserPageComponent,
    DialogComponent,
    ConfirmPostComponent,
    ConfirmUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MaterialFileInputModule,
    MatDialogModule,
    FlexLayoutModule
  ],
   
  
   
  providers: [AuthService, AuthGuard,PostService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
    
  }],
  bootstrap: [AppComponent ]
    // entryComponent:[DialogComponent]
})
export class AppModule { }

