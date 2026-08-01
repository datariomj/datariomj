import { provideHttpClient, withInterceptorsFromDi,withXhr } from '@angular/common/http';
import { importProvidersFrom,provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication,BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsStoreModule } from '@store/store.module';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';


document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, BrowserAnimationsModule, ServiceWorkerModule.register("ngsw-worker.js", { enabled: false }), NgxsStoreModule),
        provideZonelessChangeDetection(),
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
    ],
}).catch(err => console.error(err));
});
