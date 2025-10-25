import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cartera } from '../models/cartera.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarteraService {
  private apiUrl = 'http://localhost:3000/carteras';

  constructor(private http: HttpClient) {}

  list(): Observable<Cartera[]> {
    return this.http.get<Cartera[]>(this.apiUrl);
  }

  create(cartera: Cartera): Observable<Cartera> {
    return this.http.post<Cartera>(this.apiUrl, cartera);
  }
  
    update(id: number, cartera: Cartera): Observable<Cartera> {
    return this.http.put<Cartera>(`${this.apiUrl}/${id}`, cartera);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
