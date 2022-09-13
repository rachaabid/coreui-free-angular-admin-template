import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router) { }
   canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
      const token = localStorage.getItem('token') || '';
      let decodedToken: any = jwt_decode(token);
      

      if (token !== null) {
       let isExpired: any = this.isExpiredToken(token);
        if (isExpired) {
          return true
        }  
        else {

          if(decodedToken.role = 'Admin'){
            this.route.navigate(['/login'])
            alert('your token expired')
            return false
          }
          else{
            this.route.navigate(['/loginCustomer'])
            alert('your token expired')
            return false
          }
        }
        
       }
       else {
         this.route.navigate(['/register'])
         return false
       }
    
     }
     isExpiredToken(token: string): boolean{
       
       let decodedToken: any = jwt_decode(token);
      if(decodedToken.exp){
        const expireDate = (JSON.parse(atob(token.split('.')[1]))).exp;
         const curentDate = Math.floor(Date.now()/1000);
         return expireDate>curentDate
      }
      else{
        if(decodedToken.role = 'Admin'){
          this.route.navigate(['/login'])
          alert('your token expired')
          return false
        }
        else{
          this.route.navigate(['/loginCustomer'])
          alert('your token expired')
          return false
        }
      }
     }
}


