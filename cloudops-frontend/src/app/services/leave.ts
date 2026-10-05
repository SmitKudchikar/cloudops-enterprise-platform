import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateLeaveRequest, Leave } from '../models/leave';

@Injectable({
  providedIn: 'root'
})
export class leave {

  private apiUrl = '/api/leaves';

  constructor(private http: HttpClient) {}

  // GET all leaves
  getLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.apiUrl);
  }

  // GET one leave by ID
  getLeaveById(id: number): Observable<Leave> {
    return this.http.get<Leave>(`${this.apiUrl}/${id}`);
  }

  // POST - create leave
  createLeave(leave: CreateLeaveRequest): Observable<Leave> {
    return this.http.post<Leave>(this.apiUrl, leave);
  }

  // PUT - update leave
  updateLeave(id: number, leave: CreateLeaveRequest): Observable<Leave> {
    return this.http.put<Leave>(`${this.apiUrl}/${id}`, leave);
  }

  // DELETE - delete leave
  deleteLeave(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }
}