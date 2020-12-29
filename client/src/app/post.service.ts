
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

    private regUrl= "http://localhost:3334/list/post/"
    private getUrl ="http://localhost:3334/list"
    private checkurl = "http://localhost:3334/list/checkPro"
    private update = "http://localhost:3334/list/update/"
    private delete = "http://localhost:3334/list/delete/"
    private sendEmail ="http://localhost:3334/list/sendEmail"
    
  
  constructor(private http: HttpClient , private router: Router) { }

    sendMail(post: any): Observable<any>{

      return this.http.post(this.sendEmail , post)
     }

    addPost(post){

      return this.http.post(this.regUrl , post)
     }

    getPost(){

      return this.http.get(this.getUrl)
    }
    checkPro(post: any) : Observable<any>{
    
      return this.http.post(this.checkurl ,{email :post})
     .pipe(catchError(this.errorHandler))
    }
    errorHandler(error: HttpErrorResponse) {
      return throwError(error)
    }
  
    updating(post: any):Observable<any>{
      let id = sessionStorage.getItem('id')
      return this.http.put(this.update + id  , post )
    }

    toDelete(post):Observable<any>{
   
      return this.http.delete(this.delete + post  )
    }

    loggedIn(){
   
     return localStorage.getItem('token')
  }
}
