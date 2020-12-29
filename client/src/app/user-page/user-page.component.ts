
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  myForm: FormGroup;
  successMessage: String = '';

  constructor(private auth: AuthService,
               private router: Router,
               private _activatedRoute: ActivatedRoute) {
      
      this.myForm = new FormGroup({
       
        nickName: new FormControl(null , [Validators.required, Validators.minLength(4)]),
        city: new FormControl(null , [Validators.required , Validators.minLength(3)]),
        neighborhood: new FormControl(null , [Validators.required , Validators.minLength(3)]),
        phone: new FormControl(null , [Validators.required , Validators.minLength(6)]),
        password: new FormControl(null,[Validators.required , Validators.minLength(6)]),
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



// check if after press on the input you write in
isValid(controlName: string) {
   return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;

}

  ngOnInit(): void {}

 updateRegister(){
  
    if (this.myForm.valid) {
      this.auth.updating(this.myForm.value)
        .subscribe(
           data =>{
             console.log(data), 
             this.successMessage = 'access';
             sessionStorage.setItem('nickName', data.nickName)
             sessionStorage.setItem('city', data.city)
             sessionStorage.setItem('neighborhood', data.neighborhood)
             sessionStorage.setItem('phone', data.phone)

              this.router.navigate(['/home'])
           
          },
          
           error => {

             this.successMessage = error.error;
             console.log(error.error);
            
           }
         );
       }
      }
   }
