import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseURL='http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) { }

  createBook(book: any){
    return this.http.post(`${this.baseURL}Books`, book);
  }

  getBooks(){
    return this.http.get(`${this.baseURL}Books`);
  }

  getBookById(idBook: any){
    return this.http.get(`${this.baseURL}Books/${idBook}`);
   }
  
   removeBook(idBook: any){
    return this.http.delete(`${this.baseURL}Books/${idBook}`);
   }
  
   saveUpdate(idBook: any, data: any){
    return this.http.put(`${this.baseURL}Books/${idBook}`, data);
   }
}
