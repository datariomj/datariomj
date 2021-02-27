import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '@core/services/seo.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Stack } from './interfaces/stack';
import { GetData } from './store/stack.actions';
import { StackState } from './store/stack.state';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StackComponent implements OnInit {
  @Select(StackState.getData) stack$!: Observable<Stack>;

  constructor(
    private store: Store,
    private seo: SeoService,
  ) { }

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'MJ Datario | Stack',
      description: 'Personal Stack',
      image: '/assets/images/placeholder.jpg',
      slug: 'stack',
    });
    this.store.dispatch(new GetData());
  }
}
