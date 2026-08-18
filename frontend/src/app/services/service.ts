import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServiceModel } from '../models/service-model';

@Injectable({ providedIn: 'root' })
export class ServiceApi {
  private http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/services`;

  getAll(libelle?: string): Observable<ServiceModel[]> {
    const params = libelle ? { params: { libelle } } : {};
    return this.http.get<ServiceModel[]>(this.url, params);
  }

  getOne(id: number): Observable<ServiceModel> {
    return this.http.get<ServiceModel>(`${this.url}/${id}`);
  }

  create(service: ServiceModel): Observable<ServiceModel> {
    return this.http.post<ServiceModel>(this.url, service);
  }

  update(id: number, service: Partial<ServiceModel>): Observable<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.url}/${id}`, service);
  }

  archiver(id: number): Observable<ServiceModel> {
    return this.http.patch<ServiceModel>(`${this.url}/${id}/archiver`, {});
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
export class Service {}
