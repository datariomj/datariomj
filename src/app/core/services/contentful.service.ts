import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  // eslint-disable-next-line max-len
  private url = `${ environment.contentful.host }/spaces/${ environment.contentful.space }/environments/${ environment.contentful.environment }`;
  // eslint-disable-next-line max-len
  private graphUrl = `${ environment.contentful.hostGraphQL }/spaces/${ environment.contentful.space }/environments/${ environment.contentful.environment }`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllEntries(): Observable<any> {
    return this.http.get(`${ this.url }/entries`, {
      headers: this.getAuthorizationHeaders(),
    });
  }

  getAllEntriesByContentType(contentType: string): Observable<any> {
    return this.http.get(`${ this.url }/entries?content_type=${ contentType }`, {
      headers: this.getAuthorizationHeaders(),
    });
  }

  getEntryById(entryId: string) {
    return this.http.get(`${ this.url }/entries/${ entryId }`, {
      headers: this.getAuthorizationHeaders(),
    });
  }

  getFileUrlByAssetById(assetId: string) {
    return this.http.get(`${ this.url }/assets/${ assetId }`, {
      headers: this.getAuthorizationHeaders(),
    }).pipe(
      map((asset: any) => `https:${ asset.fields.file.url }`),
    );
  }

  private getAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${ environment.contentful.accessToken }`,
    });
  }
}
