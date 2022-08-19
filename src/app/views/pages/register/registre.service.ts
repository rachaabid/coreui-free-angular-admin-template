import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegistreService {
  baseURL='http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) { }

  signup(data: any){
    return this.http.post(`${this.baseURL}signup`, data);
  }
}
