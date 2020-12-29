import { Component, OnInit ,Inject } from '@angular/core';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PostService} from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileInput } from 'ngx-material-file-input';
import { fromEvent } from 'rxjs';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-confirm-post',
  templateUrl: './confirm-post.component.html',
  styleUrls: ['./confirm-post.component.css']
})

export class ConfirmPostComponent implements OnInit {

   userId = '';

  constructor(private post: PostService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialogRef: MatDialogRef<ConfirmPostComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data:any ) {}


        ngOnInit():void {}

        delete() {
      
           this.userId = sessionStorage.getItem('id');

           this.post.toDelete(this.userId).subscribe(res =>{

           console.log(res)
          // this.deleteProfile = 'your profile has been deleted successfully you wellcome again whatever you want'
           sessionStorage.removeItem('id')
        
           setTimeout(() => {this.router.navigate(['/list'])},6000)
      },
          error =>{
             console.log(error.error)
          }
        )
      }
    }
