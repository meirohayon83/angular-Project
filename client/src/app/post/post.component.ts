import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import {PostService} from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileInput } from 'ngx-material-file-input';
import { MatDialog ,  MatDialogConfig } from '@angular/material/dialog';
import {ConfirmPostComponent} from '../confirm-post/confirm-post.component';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

   myPost: FormGroup;
   days: String[] = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
   successMessage: string;
   made:boolean;
   avatar;
   userDisplayName = '';
   userDisplayLastName = '';
   userDisplayNickName ='';
   userDisplayEmail = '';
   userDisplayPhone= '';
   userToken = '';
   userId = '';
   deleteProfile;

  constructor(private post: PostService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog:MatDialog) {

      
      
      this.myPost = new FormGroup({

         name: new FormControl(null, [Validators.required , Validators.minLength(4)]),
         lastName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
         topic: new FormControl(null, [Validators.required , Validators.minLength(4)]),
         time: new FormControl(null, Validators.required),
         days: new FormControl(null, Validators.required),
         description: new FormControl(null, [Validators.required, Validators.minLength(20)]),
         image: new FormControl(''),
     
    });
    
  }

  toDel(){

      const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '25%';
        dialogConfig.height = '30%';
        dialogConfig.data = {

            title: "Are you sure?",
            message: "You are about to delete user "

        },
  
        this.dialog.open(ConfirmPostComponent, dialogConfig )
     
  }

  toupdate(){

       this.router.navigate(['/update/' + sessionStorage.getItem('id')])
   
   }

  ngOnInit() {
   

      
       this.userDisplayNickName = sessionStorage.getItem('nickName')
       this.userDisplayEmail = sessionStorage.getItem('email');
       this.userId = sessionStorage.getItem('id');
       this.checkEmail()

    }
     
      checkEmail () {
       
         this.post.checkPro(this.userDisplayEmail)
           .subscribe(res =>{
      
             this.made = true
             console.log('yes');
       
      },
        error =>{
        
            this.made = false;
            console.log(error)
            sessionStorage.setItem('id',error.error)
            
          })
    }
   
    isValid(controlName: string) {
      return this.myPost.get(controlName).invalid && this.myPost.get(controlName).touched;
 
    }


 addPosts(){


  
  if (this.myPost.valid) {

     const formData = new FormData();
     const file_form = this.myPost.get('image').value;
     const file = file_form.files[0]; // in case user didn't selected multiple files

      formData.append('name', this.myPost.get('name').value);
      formData.append('lastName', this.myPost.get('lastName').value);
      formData.append('topic', this.myPost.get('topic').value);
      formData.append('city', sessionStorage.getItem('city'));
      formData.append('neighborhood', sessionStorage.getItem('neighborhood'));
      formData.append('email',sessionStorage.getItem('email'));
      formData.append('phone', sessionStorage.getItem('phone'));
      formData.append('time', this.myPost.get('time').value);
      formData.append('days', this.myPost.get('days').value);
      formData.append('description', this.myPost.get('description').value);
      formData.append('image', file)
      formData.append('activeToken',sessionStorage.getItem('token'))
    
    this.post.addPost(formData)
      .subscribe(
        (res: any) =>{
          console.log(res),
          this.successMessage = 'post Success';
           setTimeout(() => { this.router.navigate(['/list'])},4000)
        
        },
           error => this.successMessage =  (error.error  + ' : ' + 'login again to post')
    );
  }
 }
}
