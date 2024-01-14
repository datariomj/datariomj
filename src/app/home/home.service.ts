import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getReadme(): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this.http.get('https://raw.githubusercontent.com/datariomj/datariomj/main/README.md', { headers, responseType: 'text' });
  }
}
