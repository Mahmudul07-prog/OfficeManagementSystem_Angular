import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { OfficeDto, CreateOfficeDto, UpdateOfficeDto } from '../models/office.model';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private apiUrl = environment.apiUrl + 'Offices';

  constructor(private http: HttpClient) {}

  getAll(): Observable<OfficeDto[]> {
    return this.http.get<OfficeDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<OfficeDto> {
    return this.http.get<OfficeDto>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateOfficeDto): Observable<OfficeDto> {
    return this.http.post<OfficeDto>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateOfficeDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
