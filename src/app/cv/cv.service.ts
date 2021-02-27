import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cv } from './interfaces/cv';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getCv(): Observable<Cv> {
    // todo get from api and create interfaces
    return this.http.get('/assets/json/cv.json') as Observable<Cv>;
  }
}
