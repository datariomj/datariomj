import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StackComponent implements OnInit {
  // todo get from api and create interfaces
  stack$ = this.http.get('/assets/json/stack.json') as Observable<any>;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }
}
