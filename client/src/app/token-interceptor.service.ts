import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}
  // send in headers the token and save in localStorage from auth.service.ts
  intercept(req, next) {

    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone({

         headers: req.headers.set('Authorization', 'bearer ' + authService.getToken()) 
     })
  
         return next.handle(tokenizedReq)
   }

}