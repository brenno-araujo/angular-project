import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeriodicElement } from '../models/PeriodicElement';
import { Observable } from 'rxjs';

@Injectable()
  export class PeriodicElementService {
     baseUrl = 'http://localhost:3000/book';

    constructor(private http: HttpClient) {}

    getAll(): Observable<PeriodicElement[]> {
      return this.http.get<PeriodicElement[]>(this.baseUrl);
    }

    create(element: PeriodicElement): Observable<PeriodicElement> {
      return this.http.post<PeriodicElement>(this.baseUrl, element);
    }

    update(id: number, element: PeriodicElement): Observable<PeriodicElement> {
      return this.http.put<PeriodicElement>(`${this.baseUrl}/${id}`, element);
    }

    delete(id: number): Observable<PeriodicElement> {
      return this.http.delete<PeriodicElement>(`${this.baseUrl}/${id}`);
    }

  }


