import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { ContactFormVisibility, PreloaderVisibility, ToggleSidenav } from './ui.action';

export interface UIStateModel {
  sidenavExpanded: boolean;
  showPreloader: boolean;
  showContactForm: boolean;
}

@State<UIStateModel>({
  name: 'ui',
  defaults: {
    sidenavExpanded: false,
    showPreloader: false,
    showContactForm: false,
  },
})
@Injectable()
export class UIState {
  @Action(ToggleSidenav)
  toggleSidenav({ patchState, getState }: StateContext<UIStateModel>) {
    patchState({
      sidenavExpanded: !getState().sidenavExpanded,
    });
  }

  @Action(PreloaderVisibility)
  showPreloader({ patchState }: StateContext<UIStateModel>, action: PreloaderVisibility) {
    patchState({
      showPreloader: action.showPreloader,
    });
  }

  @Action(ContactFormVisibility)
  showContactForm({ patchState }: StateContext<UIStateModel>, action: ContactFormVisibility) {
    patchState({
      showContactForm: action.showContactForm,
    });
  }

  @Selector()
  static sidenavExpanded(state: UIStateModel) {
    return state.sidenavExpanded;
  }

  @Selector()
  static showPreloader(state: UIStateModel) {
    return state.showPreloader;
  }

  @Selector()
  static showContactForm(state: UIStateModel) {
    return state.showContactForm;
  }
}
