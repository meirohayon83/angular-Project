
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // link to register
  private regUrl= "http://localhost:3334/register";
  // link to login
  private logUrl= "http://localhost:3334/login";
  // link to find if the mail already in the database
  private checkEm= "http://localhost:3334/login/testEmail";
  // link to send mail to change password
  private forget = "http://localhost:3334/forget";
  // link to check if the token right after you in the page to send new password
  private changPass = "http://localhost:3334/forget/pass/";
  // link to change password
  private change = "http://localhost:3334/changePassword/";
  //  to check the token in the link when the register get mail with link and change the active to true
  private confir = "http://localhost:3334/confir/";

  private deleteUser = "http://localhost:3334/user/"

  private updateUser = "http://localhost:3334/updateUser/"

  private firstLog = "http://localhost:3334/FirstLogin/"
  
  
  

  constructor(private http:HttpClient,private router:Router){}
   
    firstlogin(token : any) :Observable<any>{
        return this.http.post(this.firstLog , token)
     }

 //check token
 
    conf(confirim:any ):Observable<any>{

        return this.http.get(this.confir + confirim )
     }

  // register
    regUser(body: any):Observable<any> {
  
        return this.http.post(this.regUrl, body)
    // .pipe(catchError(this.errorHandler))
     }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error)
     }
  // check if the register already in
    checkEmails(user: any):Observable<any>{
       return this.http.post(this.checkEm ,{email: user})
       //  .pipe(catchError(this.errorHandler))
     }
  // send your email to get link to change password
    forgPas(pass: any):Observable<any>{
  
       return this.http.post(this.forget ,{email:pass})
   
    }

    changePas(pass: any ):Observable<any>{
      return this.http.get(this.changPass + pass)
    }


   //  chenge Password
    chengePassword(pass: any):Observable<any>{
      return this.http.post(this.change , pass)
    }

   // login
    logUser(body: any):Observable<any>{
    
      return this.http.post(this.logUrl, body)
    }
  // in the authgurd check for true or false for the token
    loggedIn(){
   
      return localStorage.getItem('userId')
   
    }
  // remove token from localStorage and send you back to login and remove from sessionStorage the user mail
    logOutUser(){

       localStorage.clear()
       sessionStorage.clear()
       this.router.navigate(['/login'])
    }
  // get the token in localStorage after login
    getToken() {

       return localStorage.getItem('token')

    }

    toDelete(post):Observable<any>{
   
    
       return this.http.delete(this.deleteUser + post  )
     
    }

    updating(post: any):Observable<any>{
      let id = localStorage.getItem('userId')
      return this.http.put(this.updateUser + id  , post )
    }

}