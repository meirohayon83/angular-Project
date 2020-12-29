import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators }   from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // the login page
   loginForm: FormGroup;
   successMessage: String = '';
   emailAns: any;
   passwordAns: any;
   token;

  constructor(private auth: AuthService,
              private router: Router,
              private _activatedRoute: ActivatedRoute) {

  this.loginForm = new FormGroup({
       email: new FormControl(null,Validators.email),
       password: new FormControl(null, Validators.required)
    });
  }
  
  ngOnInit() { }

  // check if after press on the input you write in

  isValid(controlName) {
     return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }


  loginUser(){
  
     console.log(this.loginForm.value);
        // check the information if its ok
     this.auth.logUser(this.loginForm.value).subscribe(
      
        data => {
          this.successMessage = 'Login Success'
          // save the token in localStorage 
          localStorage.setItem('token',data.token)
          console.log(data.token);
          localStorage.setItem('userId' ,data.id)
          // save the mail of the user in sessionStorage
          sessionStorage.setItem('email',data.email);
          sessionStorage.setItem('nickName' , data.nickName)
          sessionStorage.setItem('city' , data.city)
          sessionStorage.setItem('phone' , data.phone)
          sessionStorage.setItem('neighborhood', data.neighborhood)

          console.log(this.token)
          // send you to post
          setTimeout( () => {this.router.navigate(['/home'])},2000)

        },
        err => {
        
               this.successMessage = err.error
                // if the information not ok return back to login
               setTimeout( () => {this.router.navigate(['/login'])},4000)

        }
    )
 }
}
