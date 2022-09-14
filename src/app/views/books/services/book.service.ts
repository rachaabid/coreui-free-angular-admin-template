import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseURL='http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) { }

  // downloadFile(): any {
	// 	return this.http.post(`${this.baseURL}Books/download`, {responseType: 'blob', Headers: new HttpHeaders().append('Content-Type', 'application/json')});
  // }

  createBook(book: any){
    return this.http.post(`${this.baseURL}Books`, book);
  }

  getCategories() {
    return this.http.get(`${this.baseURL}listCategories`)
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

