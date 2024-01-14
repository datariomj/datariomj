import { HttpClientModule } from '@angular/common/http';
import { APP_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IconService } from '@core/services/icon.service';
import { NgxsStoreModule } from '@store/store.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    SharedModule,
    CoreModule,
    NgxsStoreModule,
  ],
  providers: [
    IconService,
    { provide: APP_ID, useValue: 'serverApp' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
