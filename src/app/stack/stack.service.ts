import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Stack } from './interfaces/stack';

@Injectable({
  providedIn: 'root',
})
export class StackService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getStack(): Observable<Stack> {
    // todo get from api and create interfaces
    return this.http.get('/assets/json/stack.json') as Observable<Stack>;
  }
}
