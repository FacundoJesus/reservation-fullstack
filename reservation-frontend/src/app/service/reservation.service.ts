import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Reservation } from '../model/reservation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.backendUrl}/reservas`;

  getAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseUrl);
  }

  create(reservation: Omit<Reservation, 'id'>): Observable<Reservation> {
    return this.http.post<Reservation>(this.baseUrl, reservation);
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
