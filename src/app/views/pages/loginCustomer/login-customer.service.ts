import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginCustomerService {
  baseURL='http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) { }

  signInCustomer(data: any){
    return this.http.post(`${this.baseURL}loginCustomer`, data);
  }
}
