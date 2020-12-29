import { Component, OnInit ,Inject } from '@angular/core';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css']
})
export class ConfirmUserComponent implements OnInit {

  userId;

  constructor(private authService: AuthService ,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      public dialogRef: MatDialogRef<ConfirmUserComponent>,
       @Inject(MAT_DIALOG_DATA)
      public data:any ) { }

   ngOnInit(): void {}

    delete(){

         this.userId = localStorage.getItem('userId');
         this.authService.toDelete(this.userId).subscribe(res =>{
  
         console.log(res)

         localStorage.clear()
         sessionStorage.clear()
            
        },
         error =>{

            console.log(error.error)
           }
      )
    } 
  }
