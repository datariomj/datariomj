import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { ToggleSidenav } from './app.action';

export interface AppStateModel {
  sidenavExpanded: boolean;
}

@State<AppStateModel>({
  name: 'ui',
  defaults: {
    sidenavExpanded: false,
  },
})
@Injectable()
export class AppState {
  @Action(ToggleSidenav)
  toggleSidenav({ patchState, getState }: StateContext<AppStateModel>) {
    patchState({
      sidenavExpanded: !getState().sidenavExpanded,
    });
  }

  @Selector()
  static sidenavExpanded(state: AppStateModel) {
    return state.sidenavExpanded;
  }
}
