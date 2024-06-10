import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donator } from '../models/donator';

const endpoint = 'http://localhost:3000/api/v1/donator';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class DonatorRestService {

  constructor(private http: HttpClient) { }

  getDonators(): Observable<Donator[]> {
    return this.http.get<Donator[]>(endpoint, httpOptions);
  }
}
