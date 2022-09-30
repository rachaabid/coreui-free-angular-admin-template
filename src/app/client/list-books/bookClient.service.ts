import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookClientService {
  baseURL='http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) { }

  getBooks(){
    return this.http.get(`${this.baseURL}BooksCustomer`);
  }

  getBookById(idBook: any){
    return this.http.get(`${this.baseURL}BookCustomer/${idBook}`);
   }
}
