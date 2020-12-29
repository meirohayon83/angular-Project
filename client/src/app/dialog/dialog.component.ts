import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PostService} from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  
  nickName;
  userEmail;
  teacherEmail;
  message:String;

constructor(private post: PostService ,
    private router: ActivatedRoute,
    public dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any )
    {}

   ngOnInit(): void {}

    sending(){   

          let user = {

              nickName:this.data.nickName,
              userEmail:this.data.userEmail,
              teacherEmail: this.data.teacherEmail,
              message:this.message,
              phone:this.data.phone,
              city:this.data.city,
              neighborhood:this.data.neighborhood
          }
            
              this.post.sendMail(user).subscribe(res =>{
              console.log(res);
          }, error =>   
              console.log(error)
          ) 
     }
    }
