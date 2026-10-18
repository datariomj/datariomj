import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { provideStore } from '@ngxs/store';

import { DEVTOOLS_REDUX_CONFIG, LOGGER_CONFIG, OPTIONS_CONFIG, STATES_MODULES } from './store.config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideStore(
      STATES_MODULES,
      OPTIONS_CONFIG,
      withNgxsReduxDevtoolsPlugin(DEVTOOLS_REDUX_CONFIG),
      withNgxsLoggerPlugin(LOGGER_CONFIG),
    ),
  ],
})
export class NgxsStoreModule { }
