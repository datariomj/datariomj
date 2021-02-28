import { Injectable } from '@angular/core';
import { ContentfulService } from '@core/services/contentful.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Stack } from './interfaces/stack';

@Injectable({
  providedIn: 'root',
})
export class StackService {
  constructor(
    private cms: ContentfulService,
  ) {
  }

  getStackV2(): Observable<Stack> {
    return this.cms.getAllEntriesByContentType('technology').pipe(
      map(entries => {
        const fields = entries.items.map((nested: any) => nested.fields);

        return fields;
      }),
    );
  }
}
