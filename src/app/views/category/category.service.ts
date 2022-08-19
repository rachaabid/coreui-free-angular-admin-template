import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseURL='http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) { }

  createacategory(category: any){
    return this.http.post(`${this.baseURL}Category`, category);
  }

  getCategories(){
    return this.http.get(`${this.baseURL}Categories`);
  }

  getBooks() {
   return this.http.get(`${this.baseURL}listBooks`)
  }

 getCategoryById(idCategory: any){
  return this.http.get(`${this.baseURL}Categorys/${idCategory}`);
 }

 removeCategory(idCategory: any){
  return this.http.delete(`${this.baseURL}Categorys/${idCategory}`);
 }

 saveUpdate(idCategory: any, data: any){
  return this.http.put(`${this.baseURL}Categorys/${idCategory}`, data);
 }
}

