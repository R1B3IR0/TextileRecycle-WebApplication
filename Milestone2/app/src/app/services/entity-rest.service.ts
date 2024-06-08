import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Entity } from '../models/entity';


const endpoint = 'http://localhost:3000/api/v1/entity';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EntityRestService {

  constructor(private http: HttpClient) { }

  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(endpoint, httpOptions);
  }

  /*
  getEntitiesFiltered(filters: any): Observable<Entity[]> {
    // Convertendo os filtros em parâmetros de URL
    const params = new URLSearchParams(filters).toString();
    const url = `${endpoint}?${params}`; // Replace this.endpoint with endpoint
    return this.http.get<Entity[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching filtered entities:', error);
        return throwError(error);
      })
    );
  }
  */
}
