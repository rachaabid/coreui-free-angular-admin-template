import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  baseURL='http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) { }

  reset(resetToken: any, data: any){
   return this.http.post(`${this.baseURL}resetPassword`+resetToken, data) ;
  }
}