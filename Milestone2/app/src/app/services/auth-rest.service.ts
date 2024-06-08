// auth-rest.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:3000/api/v1/auth/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(endpoint + 'login', { email, password }, httpOptions);
  }

  register(formData: any): Observable<any> {
    return this.http.post(endpoint + 'register', formData, httpOptions);
  }
}
