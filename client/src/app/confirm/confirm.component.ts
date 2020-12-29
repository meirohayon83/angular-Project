
import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators }   from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

    loginForm: FormGroup;
    successMessage: String = '';
    emailAns: any;
    passwordAns: any;
    token;
    pro ;
    active: any

  // after register you get mail to confirm with the token in the link
  // its take the token from the link and check if its right 
  // send you to make post
  
  constructor(private auth: AuthService,
     private router: Router,
     private route: ActivatedRoute) {

    
      //get the token from the link and send it with VerifyToken() 
      this.route.params.subscribe(params => {
      this.active = params.token; 
      this.VerifyToken();
        
     })

        this.loginForm = new FormGroup({
          email: new FormControl(null,Validators.email),
          password: new FormControl(null, Validators.required)
      })
    }

    isValid(controlName) {
         return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
    }


    VerifyToken() {

      this.auth.conf(this.active)
      .subscribe(
    
        data => {

           this.pro = "your active is true now you can loggin "
           console.log('done')
      
       },
        (err) => {
         
          this.pro = err.error.message
          console.log(err)
        
      }
    )
  }
  ngOnInit() {}


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
         
              this.successMessage = 'Login error with email or password'
              // if the information not ok return back to login
              setTimeout( () => {this.router.navigate(['/login'])},4000)
      }
    )
   }
 }
