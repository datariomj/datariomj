import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { ErrorHandler, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import * as Sentry from '@sentry/angular';
import { NgxsStoreModule } from '@store/store.module';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { environment } from './environments/environment';

if (environment.sentryDsn) {
  Sentry.init({
    dsn: environment.sentryDsn,
    environment: environment.sentryEnv,
    release: environment.version,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({ maskAllText: false, maskAllInputs: true }),
    ],
    tracesSampleRate: environment.production ? 0.2 : 1.0,
    replaysSessionSampleRate: environment.production ? 0.1 : 0,
    replaysOnErrorSampleRate: 1.0,
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, BrowserAnimationsModule, ServiceWorkerModule.register("ngsw-worker.js", { enabled: false }), NgxsStoreModule),
        provideZonelessChangeDetection(),
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        { provide: ErrorHandler, useValue: Sentry.createErrorHandler({ showDialog: false }) },
    ],
}).catch(err => console.error(err));
});
