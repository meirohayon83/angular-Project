// import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
  
// }





import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import {AuthService} from './auth.service'
import {PostService} from './post.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  // to let you get in with authgurd when the token in the localStorage
 constructor(private auth: AuthService,private router: Router){}

  canActivate(): boolean{
   if(this.auth.loggedIn()){

        return true
   }else{
        this.router.navigate(['/login'])
        return false
    }
  } 
}
