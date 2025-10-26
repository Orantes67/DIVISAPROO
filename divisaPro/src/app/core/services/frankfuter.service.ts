import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FrankfurterService {
  private apiUrl = `${environment.apiUrl}/transacciones/convertir-divisa`;

  constructor(private http: HttpClient) {}

  obtenerTasa(from: string, to: string, amount: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('amount', amount);

    return this.http.get<any>(this.apiUrl, { params });
  }
}
