import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EmployeeDto, CreateEmployeeDto, UpdateEmployeeDto } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl + 'Employees';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.apiUrl);
  }

  getByOffice(officeId: number): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(`${this.apiUrl}/by-office/${officeId}`);
  }

  getById(id: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateEmployeeDto): Observable<EmployeeDto> {
    return this.http.post<EmployeeDto>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateEmployeeDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
