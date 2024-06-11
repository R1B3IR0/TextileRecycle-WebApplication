import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Donation } from '../models/donation';


const endpoint = 'http://localhost:3000/api/v1/donation';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DonationRestService {

  constructor(private http: HttpClient) { }

  addDonation(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(endpoint + '/create', JSON.stringify(donation), httpOptions)
  }
}
