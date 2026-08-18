import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TicketModel, TicketServiceItem } from '../models/ticket-model';

@Injectable({ providedIn: 'root' })
export class TicketApi {
  private http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/tickets`;

  getAll(): Observable<TicketModel[]> {
    return this.http.get<TicketModel[]>(this.url);
  }

  getOne(id: number): Observable<TicketModel> {
    return this.http.get<TicketModel>(`${this.url}/${id}`);
  }

  create(payload: { services: TicketServiceItem[] }): Observable<TicketModel> {
    return this.http.post<TicketModel>(this.url, payload);
  }

  changerStatut(id: number, statut: string): Observable<TicketModel> {
    return this.http.patch<TicketModel>(`${this.url}/${id}/statut`, { statut });
  }

  annuler(id: number): Observable<TicketModel> {
    return this.http.patch<TicketModel>(`${this.url}/${id}/annuler`, {});
  }
}
