import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  code: string;
  name: string;
  length: number;
  start: string;
  resort: string;
  perPerson: number;
  image: string;
  description: string[];
  _id?: string;
}

@Injectable({ providedIn: 'root' })
export class TripService {
  private base = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  list(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.base);
  }

  // use explicit by-code route (case-insensitive on server)
  get(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.base}/bycode/${encodeURIComponent(code)}`);
  }

  add(t: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.base, t);
  }

  update(code: string, t: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${this.base}/bycode/${encodeURIComponent(code)}`, t);
  }

  remove(code: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/bycode/${encodeURIComponent(code)}`);
  }
}
