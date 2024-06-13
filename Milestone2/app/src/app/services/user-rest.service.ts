import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Donation } from '../models/donation';

const endpoint = 'http://localhost:3000/api/v1/user';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  constructor(private http: HttpClient) { }
  /**
   * Get all donations from user
   * @returns  {Observable<Donation>}
   */
  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint);
  }

  /**
   * Get total points from user
   * @returns  {Observable<Donation>}
   */
  getPoints(): Observable<Donation> {
    return this.http.get<Donation>(endpoint + '/points');
  }

  getDonator(): Observable<Donation> {
    return this.http.get<Donation>(endpoint + "/user-info");
  }
}
