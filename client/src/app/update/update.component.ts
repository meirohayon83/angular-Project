
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import {PostService} from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileInput } from 'ngx-material-file-input';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

 
  myPost: FormGroup;
  successMessage: string;
  avatar;
  userDisplayPhone= '';
  update;

 constructor(private post: PostService,
             private router: Router,
             private activatedRoute: ActivatedRoute) {
     
   this.myPost = new FormGroup({

       name: new FormControl(null, [Validators.required , Validators.minLength(4)]),
       lastName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
       topic: new FormControl(null, [Validators.required , Validators.minLength(4)]),
       time: new FormControl(null, Validators.required),
       days: new FormControl(null, Validators.required),
       description: new FormControl(null, [Validators.required, Validators.minLength(20)]),
       image: new FormControl('')

   });
 }


 ngOnInit() { }
    
   
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
    formData.append('email',sessionStorage.getItem('email'));
    formData.append('neighborhood', sessionStorage.getItem('neighborhood'));
    formData.append('phone', sessionStorage.getItem('phone'));
    formData.append('time', this.myPost.get('time').value);
    formData.append('days', this.myPost.get('days').value);
    formData.append('description', this.myPost.get('description').value);
    formData.append('image', file)
    formData.append('activeToken',sessionStorage.getItem('token'))

   this.post.updating(formData)
     .subscribe(
       res =>{ 
       
           sessionStorage.setItem('topic', res.topic);
           sessionStorage.setItem('city' , res.city)
           sessionStorage.setItem('neighborhood' , res.neighborhood)
           sessionStorage.setItem('phone' , res.phone)
           sessionStorage.setItem('time' , res.time)
           sessionStorage.setItem('days' , res.days)
           sessionStorage.setItem('image' , res.image)
           sessionStorage.setItem('description' , res.description)
           sessionStorage.setItem('lastName' , res.lastName)
           sessionStorage.setItem('name' , res.name)

        this.update = 'your appdating access'
         setTimeout(() => {this.router.navigate(['list'])},6000)
      
      
       },

          error => this.successMessage = (error.error  + ' : ' + 'login again to update')
        
       
    );
  }
 }
}



