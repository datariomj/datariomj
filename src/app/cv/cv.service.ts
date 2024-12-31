import { Injectable } from '@angular/core';
import { ContentfulService } from '@core/services/contentful.service';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { CvDetail } from './interfaces/cv-detail';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  constructor(
    private cms: ContentfulService,
  ) {
  }

  // todo fix types
  getCv(): Observable<any> {
    return this.cms.getAllEntriesByContentType('cvList').pipe(
      map(entries => {
        const fields = entries.items.map((nested: any) => nested.fields);

        return fields;
      }),
      mergeMap((items: any[]) => {
        const itemObs: any = [];

        items.forEach(item => {
          if (item.children && item.children.length) {
            const childObs: any = [];

            item.children.forEach((child: any) => {
              childObs.push(this.cms.getEntryById(child.sys.id).pipe(
                catchError(() => of(null)),
              ));
            });

            if (childObs.length) {
              itemObs.push(forkJoin(childObs).pipe(
                map((childrenRes: any) => {
                  const filteredRes = childrenRes.filter((childRes: any) => childRes);
                  const parsedChildren = filteredRes.map((childRes: any) => ({
                    name: childRes.fields.title,
                    title: childRes.fields.entryTitle,
                    route: childRes.sys.id,
                  }));

                  return {
                    name: item.name,
                    order: item.order,
                    children: parsedChildren,
                  };
                }),
              ));
            }
          } else {
            itemObs.push(of({
              name: item.name,
              order: item.order,
              children: [],
            }));
          }
        });

        if (itemObs.length) {
          return forkJoin(itemObs);
        }

        return of(
          items.map((item: any) => ({
            name: item.name,
            order: item.order,
            children: [],
          })),
        );
      }),
      map((items: any) => items.sort((a: any, b: any) => a.order - b.order)),
    );
  }

  // todo fix types
  getCvDetail(entryId: string): Observable<CvDetail> {
    return this.cms.getEntryById(entryId).pipe(
      map((test: any) => ({
        ...test.fields,
        entryId,
      })),
    );
  }
}
