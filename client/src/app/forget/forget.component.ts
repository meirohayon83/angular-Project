import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
    successMessage: String = '';
    email:String ='';
    access = false;
 
  constructor(private auth: AuthService , private router: Router) { }

  // the page of forget password with send mail to get mail with
  // new link to change password

  ngOnInit() {}


  loginUser(){
       this.auth.forgPas(this.email)
       .subscribe(res =>{
          console.log(res)
        // send the token to localStorage
          localStorage.setItem('token',res.token);
          localStorage.removeItem('userId')
          sessionStorage.clear()
        // if its right email 
          this.successMessage = 'go to yourse EMAIL to change your password';
          this.access = true;
          setTimeout(() => {this.router.navigate(['/home'])},5000)
      },
        error =>{
          // if the email not found
          console.log(error.error)
          this.successMessage = 'your email is not valid';
          this.access = true;
       })
      }
    }
