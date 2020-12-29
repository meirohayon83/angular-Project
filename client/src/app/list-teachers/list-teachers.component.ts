
import { Component, OnInit, } from '@angular/core';
import {PostService} from '../post.service';
import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { ActivatedRoute ,Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog ,  MatDialogConfig } from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';


@Component({
   selector: 'app-list-teachers',
   templateUrl: './list-teachers.component.html',
   styleUrls: ['./list-teachers.component.css']
})

export class ListTeachersComponent implements OnInit {

   times: string[] = ['morning', 'noon', 'evening'];
   list:any;
   city: any;
   topic: any;
   neighborhood: any;
   time: any;
   allList: any;
   message = "not found any list"
   expired;
   count:any;
   searchText;

  constructor(private post: PostService ,
      private activatedRoute: ActivatedRoute, 
      private router: Router ,
      private dialog: MatDialog) {}

  dialoge(e){

      const dialogConfig = new MatDialogConfig();

         dialogConfig.disableClose = true;
         dialogConfig.autoFocus = true;
         dialogConfig.width = '40%';
         dialogConfig.height = '40%';
         dialogConfig.data = {

            nickName: sessionStorage.getItem('nickName'),
            userEmail: sessionStorage.getItem('email'),
            city: sessionStorage.getItem('city'),
            neighborhood: sessionStorage.getItem('neighborhood'),
            phone: sessionStorage.getItem('phone'),
            teacherEmail: e
    },


          this.dialog.open(DialogComponent, dialogConfig )
     
  }
   

  ngOnInit() {
    
    // get all the teacher list from the data
            
    this.post.getPost().subscribe(res =>{
    this.allList = res,
    this.list = this.allList,
    this.count = this.allList.length,
     localStorage.setItem('counter' , this.count)
  
   },
    error => {
         
        console.log(error.error)
        this.expired = error.error +' : '+ '' + 'please loggin again'
       }
      );
      
     }

    
    //  all the option of search and deafault list with settimeout for delay 

       chooseCity(){
        
      
        // if the search input empty the list get from allList all the teachers
        if(!this.city && !this.topic && !this.neighborhood && !this.time ){

              this.list = this.allList
              this.count = this.list.length
        } 

       
        setTimeout(()=> {
        
          // when the serach not empty the list get from allList filter
          if(this.city && !this.neighborhood && !this.topic && !this.time){

            this.list = this.allList.filter(area => area.city == this.city)
            this.count = this.list.length
         }
          if(this.city && !this.neighborhood && this.topic && !this.time){

            this.list = this.allList.filter(area => area.city == this.city && area.topic == this.topic)
            this.count = this.list.length
        }
         if(this.city && !this.neighborhood && !this.topic && this.time){

           this.list = this.allList.filter(area => area.city == this.city && area.time == this.time)
           this.count = this.list.length

        }
        if(this.city && !this.neighborhood && this.topic && this.time){

          this.list = this.allList.filter(area => area.city == this.city && area.topic == this.topic && area.time == this.time)
          this.count = this.list.length
        }

        else if(this.city && this.neighborhood && !this.topic && !this.time){

             this.list = this.allList.filter(area => 
               area.city == this.city && area.neighborhood == this.neighborhood)
               this.count = this.list.length

        }
        else if(!this.city && this.neighborhood && !this.topic && !this.time){

             this.list = this.allList.filter(area => 
               area.neighborhood == this.neighborhood),
               this.count = this.list.length
        }
        else if(!this.city && this.neighborhood && this.topic && !this.time){

              this.list = this.allList.filter(area => 
               area.neighborhood == this.neighborhood && area.topic == this.topic)
               this.count = this.list.length

        }
        else if(!this.city && this.neighborhood && !this.topic && this.time){

             this.list = this.allList.filter(area => 
              area.neighborhood == this.neighborhood && area.time == this.time)
              this.count = this.list.length

        }
        else if(!this.city && this.neighborhood && this.topic && this.time){

             this.list = this.allList.filter(area => 
              area.neighborhood == this.neighborhood && area.topic == this.topic && area.time == this.time)
              this.count = this.list.length

        }

        else if(this.city && this.neighborhood && this.topic && !this.time){

            this.list = this.allList.filter(area => 
             area.city == this.city && area.neighborhood == this.neighborhood && area.topic == this.topic)
             this.count = this.list.length

        }
        else if(!this.city && !this.neighborhood && this.topic && !this.time){

           this.list = this.allList.filter(area => 
            area.topic == this.topic)
            this.count = this.list.length

        }
        else if(!this.city && !this.neighborhood && this.topic && this.time){

           this.list = this.allList.filter(area => 
            area.topic == this.topic && area.time == this.time)
            this.count = this.list.length

        }
        else if(this.city && this.neighborhood && !this.topic && this.time){

           this.list = this.allList.filter(area => 
            area.city == this.city && area.neighborhood == this.neighborhood && area.time == this.time)
            this.count = this.list.length

        }

        else if(!this.city && !this.neighborhood && this.topic && !this.time){

           this.list = this.allList.filter(area => 
            area.topic == this.topic && area.time == this.time)
            this.count = this.list.length

        }
        else if(!this.city && !this.neighborhood && !this.topic && this.time){

          this.list = this.allList.filter(area => 
           area.time == this.time)
           this.count = this.list.length

        }

        else if(this.city && this.neighborhood && this.topic && this.time){

           this.list = this.allList.filter(area => 
            area.city == this.city && area.neighborhood == this.neighborhood && area.topic == this.topic && area.time == this.time)
            this.count = this.list.length

        }
      
      },5000)
    }
  }

       
      