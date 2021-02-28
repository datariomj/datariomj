import { environment } from '@env/environment';
import { NgxsDevtoolsOptions } from '@ngxs/devtools-plugin/src/symbols';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin/src/symbols';
import { NgxsConfig } from '@ngxs/store/src/symbols';

import { UIState } from './ui/ui.state';

export const STATES_MODULES = [
  UIState,
];

export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
  developmentMode: !environment.production,
};

export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
  disabled: environment.production,
};

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
  disabled: true,
};
