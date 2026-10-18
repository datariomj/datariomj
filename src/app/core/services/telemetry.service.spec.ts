import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { TelemetryService } from './telemetry.service';

describe('TelemetryService', () => {
  let service: TelemetryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TelemetryService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TelemetryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created with initial null status', () => {
    expect(service).toBeTruthy();
    expect(service.status().endpointHealthy).toBeNull();
    expect(service.status().latencyMs).toBeNull();
  });

  it('sets endpointHealthy to true on successful request', () => {
    service.checkTelemetry();
    const req = httpMock.expectOne('/status.json');
    expect(req.request.method).toBe('GET');
    req.flush({ service: 'datariomj.dev' }, { status: 200, statusText: 'OK' });

    expect(service.status().endpointHealthy).toBe(true);
    expect(service.status().latencyMs).toBeTypeOf('number');
    expect(service.status().checkedAt).toBeTruthy();
  });

  it('sets endpointHealthy to false on error', () => {
    service.checkTelemetry();
    const req = httpMock.expectOne('/status.json');
    req.flush('Error', { status: 500, statusText: 'Internal Error' });

    expect(service.status().endpointHealthy).toBe(false);
    expect(service.status().latencyMs).toBeTypeOf('number');
  });
});
