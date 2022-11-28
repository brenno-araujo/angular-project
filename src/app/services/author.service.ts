import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeriodicElement } from '../models/PeriodicElement';
import { Observable } from 'rxjs';
import { Author } from '../models/Author';

@Injectable()
  export class AuthorService {
     baseUrl = 'http://localhost:3000/author';

     constructor(private http: HttpClient) {}

    getAll(): Observable<Author[]> {
      return this.http.get<Author[]>(this.baseUrl);
    }
}
