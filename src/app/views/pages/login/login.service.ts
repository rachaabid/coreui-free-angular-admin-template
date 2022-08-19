import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL='http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) { }

  signIn(data: any){
    return this.http.post(`${this.baseURL}login`, data);
  }
}
