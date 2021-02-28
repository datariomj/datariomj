import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
// import { createClient, Entry } from 'contentful';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private spaceUrl = `${ environment.contentful.host }/spaces/${ environment.contentful.space }`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllEntries(): Observable<any> {
    return this.http.get(`${ this.spaceUrl }/entries`, {
      headers: this.getAuthorizationHeaders(),
    });
  }

  getAllEntriesByContentType(contentType: string): Observable<any> {
    return this.http.get(`${ this.spaceUrl }/entries?content_type=${ contentType }`, {
      headers: this.getAuthorizationHeaders(),
    });
  }

  getEntryById(entryId: string) {
    return this.http.get(`${ this.spaceUrl }/entries/${ entryId }`, {
      headers: this.getAuthorizationHeaders(),
    });
  }

  getFileUrlByAssetById(assetId: string) {
    return this.http.get(`${ this.spaceUrl }/assets/${ assetId }`, {
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
