
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})

// the page of change password
export class ChangePassComponent implements OnInit {

      [x: string]: any;
      ResponseResetForm: FormGroup;
      forbiddenEmails: any;
      errorMessage: string;
      successMessage: string;
      token:any;
      CurrentState: any;
      IsResetFormValid = true;

  constructor(private auth: AuthService, private router: Router,
    private route: ActivatedRoute ,  private fb: FormBuilder ) {
      this.CurrentState = 'Wait';
      // check the token in the link and save to this.token
      this.route.params.subscribe(params => {
      this.token = params.token;
      console.log({par:this.token});
        //  send to database to find if its in the database
      this.VerifyToken();
      });
      this.ResponseResetForm = new FormGroup({

          activeToken: new FormControl(this.token),
          password: new FormControl (null,[Validators.required , Validators.minLength(6)]),
          confirmPassword: new FormControl (null,[Validators.required , Validators.minLength(6)]),
        },{validators: this.passwordConfirming}
      );

     }
     
    //  if its correct the token in the link continue to show the inputs
   

      VerifyToken() {
        console.log(this.token)
        this.auth.changePas(this.token).subscribe(
        data => {

          this.CurrentState = 'Verified';
          console.log(data)
          
        },
        (err) => {
          this.CurrentState = 'NotVerified';
        }
      );
    }

// check if the password and the confirmPassword correct

   passwordConfirming(conP: AbstractControl): { invalid: boolean } {
      if(conP.get('confirmPassword').value){
      if (conP.get('password').value !== conP.get('confirmPassword').value) {
      return {invalid: true};
   }
  }
 }


  // check if its valid input
   isValid(controlName: string) {

     return this.ResponseResetForm.get(controlName).invalid && this.ResponseResetForm.get(controlName).touched;
 }
   
   Init() {}

   ngOnInit() { }


   ResetPassword(){
    if (this.ResponseResetForm.valid) {
       this.IsResetFormValid = true;
      
       this.auth.chengePassword(this.ResponseResetForm.value).subscribe(
         res =>{
      
          this.ResponseResetForm.reset();
          this.successMessage = res.message;
        setTimeout(() => {
          this.successMessage = null;
          localStorage.clear()
          sessionStorage.clear()
          this.router.navigate(['login']);
        }, 3000);
    
      },
      err => {
        this.successMessage = err.error
      }
    );
    
    }else{ this.IsResetFormValid = false;}
 }
}

