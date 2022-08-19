import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseURL='http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) { }

  createaCustomer(customer: any){
    return this.http.post(`${this.baseURL}Customer`, customer);
  }

  getCustomers(){
    return this.http.get(`${this.baseURL}Customers`);
  }

 getCustomerById(idCustomer: any){
  return this.http.get(`${this.baseURL}Customer/${idCustomer}`);
 }

 removeCustomer(idCustomer: any){
  return this.http.delete(`${this.baseURL}Customer/${idCustomer}`);
 }

 saveUpdate(idCustomer: any, data: any){
  return this.http.put(`${this.baseURL}Customer/${idCustomer}`, data);
 }
}

