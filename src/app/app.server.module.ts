import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { IconService } from '@core/services/icon.service';
import { IconServerService } from '@core/services/icon-server.service';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    SharedModule,
    CoreModule,
  ],
  providers: [
    {
      provide: IconService,
      useClass: IconServerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
