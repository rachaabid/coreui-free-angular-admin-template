import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseURL='http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) { }

  createCategory(category: any){
    return this.http.post(`${this.baseURL}Categories`, category);
  }

  getCategories(){
    return this.http.get(`${this.baseURL}Categories`);
  }

 getCategoryById(idCategory: any){
  return this.http.get(`${this.baseURL}Categories/${idCategory}`);
 }

 removeCategory(idCategory: any){
  return this.http.delete(`${this.baseURL}Categories/${idCategory}`);
 }

 saveUpdate(idCategory: any, data: any){
  return this.http.put(`${this.baseURL}Categories/${idCategory}`, data);
 }
}

