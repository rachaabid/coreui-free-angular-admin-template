import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseURL='http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) { }

  createCustomer(customer: any){
    return this.http.post(`${this.baseURL}Customers`, customer);
  }

  getCustomers(){
    return this.http.get(`${this.baseURL}Customers`);
  }

 getCustomerById(idCustomer: any){
  return this.http.get(`${this.baseURL}Customers/${idCustomer}`);
 }

 removeCustomer(idCustomer: any){
  return this.http.delete(`${this.baseURL}Customers/${idCustomer}`);
 }

 saveUpdate(idCustomer: any, data: any){
  return this.http.put(`${this.baseURL}Customers/${idCustomer}`, data);
 }
}

