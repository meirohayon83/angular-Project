import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
 

// register page

  myForm: FormGroup;
  successMessage;
  emailAns:String ='';
 
  constructor(private auth: AuthService,
              private router: Router,
              private _activatedRoute: ActivatedRoute) {
      
    this.myForm = new FormGroup({
      
       nickName: new FormControl(null, [Validators.required , Validators.minLength(4)]),
       email: new FormControl(null, Validators.email),
       password: new FormControl(null,[Validators.required , Validators.minLength(6)]),
       phone: new FormControl(null, [Validators.required , Validators.minLength(9)]),
       city: new FormControl(null, [Validators.required , Validators.minLength(5)]),
       neighborhood: new FormControl(null, [Validators.required, Validators.minLength(3)]),
       confirmPassword: new FormControl(null , [Validators.required]),
    },{validators: this.passwordConfirming});
  
  }

  // check if the password and the confirmPassword same
  passwordConfirming(conP: AbstractControl): { invalid: boolean } {
    if(conP.get('confirmPassword').value){
    if (conP.get('password').value !== conP.get('confirmPassword').value) {
        return {invalid: true};
    }
  }
}
 
  ngOnInit() {}

   // check if after press on the input you write in
   isValid(controlName: string) {

      return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
   }
  
//  check if the email already in the database
    checkEmail(){

      this.auth.checkEmails(this.myForm.get('email').value)
       .subscribe(res =>{
        
          this.emailAns = ''
    
      },
        error =>{
            console.log(error.error),
            this.emailAns = error.error
          
       })
    }
   
    
    
  
  // send the information to register
   registerUser(){
    
    if (this.myForm.valid) {
      this.auth.regUser(this.myForm.value)
        .subscribe(
           data =>{
         
              this.successMessage = 'go to youre EMAIL to accept the register';
              console.log(data);
              localStorage.setItem('token', data.token)
              localStorage.setItem('active' , data.data.active)
              setTimeout(() => {this.router.navigate(['/home'])},2000)
         
           
          },
          
           error => {

             this.successMessage =  error.error;
             console.log(this.successMessage);
            
           }
        );
       }
     }
  }

