import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContentfulService } from '@core/services/contentful.service';
import { SeoService } from '@core/services/seo.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Stack } from './interfaces/stack';
import { StackItem } from './interfaces/stack-item';
import { GetData } from './store/stack.actions';
import { StackState } from './store/stack.state';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StackComponent implements OnInit {
  @Select(StackState.getItems) stack$!: Observable<StackItem[]>;

  constructor(
    private store: Store,
    private seo: SeoService,
    private cms: ContentfulService,
  ) {
  }

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'MJ Datario | Stack',
      description: 'Personal Stack',
      image: '/assets/images/placeholder.jpg',
      slug: 'stack',
    });
    this.store.dispatch(new GetData());

    // this.cms.getAllEntriesByContentType('technology').subscribe(console.log);
    // this.cms.getEntryById('10xhkrXOMbiFp3SzrUxcMt').subscribe(console.log);
  }
}
