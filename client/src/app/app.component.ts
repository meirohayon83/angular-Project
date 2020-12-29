// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'my-project';
// }

import { Component , OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {map , shareReplay} from 'rxjs/operators';
import { MatDialog ,  MatDialogConfig } from '@angular/material/dialog';
import {ConfirmUserComponent} from './confirm-user/confirm-user.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'myProject';
  userId =''
  theUserNickName = '' ;
  id;
  count: string;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 
   constructor(public authService: AuthService , private breakpointObserver: BreakpointObserver ,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private dialog:MatDialog){}

     userDisplayName = '';
   ngOnInit() {
   
       this.userDisplayName = sessionStorage.getItem('email');
       this.count = localStorage.getItem('counter')
      
    }
    get counter(){
        return this.count = localStorage.getItem('counter')
    }

    get yourId() {

        return this.id = localStorage.getItem('userId')
      }

    get run(){

        return this.theUserNickName = sessionStorage.getItem('nickName')
    }

    toDelete(){

       const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '25%';
        dialogConfig.height = '30%';
        dialogConfig.data = {

            title: "Are you sure?",
            message: "You are about to delete user "
        },
    
        this.dialog.open(ConfirmUserComponent, dialogConfig )
     
  }
 }
