import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentfulGraphqlService {
  // eslint-disable-next-line max-len
  private url = `${ environment.contentful.hostGraphQL }/spaces/${ environment.contentful.space }/environments/${ environment.contentful.environment }`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getEntryById(entryId: string) {
    return this.http.get(`${ this.url }/entries/${ entryId }`, {
      headers: this.getAuthorizationHeaders(),
    });
  }

  private getAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${ environment.contentful.accessToken }`,
    });
  }
}
