import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export interface TelemetryStatus {
  endpointHealthy: boolean | null;
  latencyMs: number | null;
  checkedAt: string | null;
  sentryActive: boolean;
  online: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  private http = inject(HttpClient);

  readonly status = signal<TelemetryStatus>({
    endpointHealthy: null,
    latencyMs: null,
    checkedAt: null,
    sentryActive: true,
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
  });

  checkTelemetry(): void {
    const start = performance.now();
    this.http.get('/status.json', { observe: 'response' }).pipe(
      map((res) => {
        const latency = Math.round(performance.now() - start);
        return {
          endpointHealthy: res.status === 200,
          latencyMs: latency,
          checkedAt: new Date().toLocaleTimeString(),
          sentryActive: true,
          online: typeof navigator !== 'undefined' ? navigator.onLine : true,
        };
      }),
      catchError(() => {
        const latency = Math.round(performance.now() - start);
        return of({
          endpointHealthy: false,
          latencyMs: latency,
          checkedAt: new Date().toLocaleTimeString(),
          sentryActive: true,
          online: typeof navigator !== 'undefined' ? navigator.onLine : true,
        });
      }),
    ).subscribe((newStatus) => {
      this.status.set(newStatus);
    });
  }
}
