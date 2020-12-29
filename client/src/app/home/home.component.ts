
import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators }   from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

     userId =''
     theUserNickName = '' ;
     id;
   constructor(private auth: AuthService,
      private router: Router,
      private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

    
    this.id = localStorage.getItem('userId')

  }
  
}

