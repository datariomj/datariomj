import { Injectable } from '@angular/core';
import { HomeService } from '@home/home.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { PreloaderVisibility } from '@store/ui/ui.action';
import { finalize, tap } from 'rxjs/operators';

import { GetReadme } from './home.actions';

export interface HomeStateModel {
    readme: string;
}

@State<HomeStateModel>({
    name: 'home',
    defaults: {
        readme: '',
    },
})
@Injectable()
export class HomeState {
    constructor(
        private homeService: HomeService,
        private store: Store,
    ) {
    }

    @Selector()
    public static getReadme(state: HomeStateModel) {
        return state.readme;
    }

    @Action(GetReadme)
    getReadme({ patchState, getState }: StateContext<HomeStateModel>) {
        const state = getState();

        if (state && state.readme) {
            return;
        }

        this.store.dispatch(new PreloaderVisibility(true));

        return this.homeService.getReadme().pipe(
            tap(readme => {
                patchState({
                    readme,
                });
            }),
            finalize(() => {
                this.store.dispatch(new PreloaderVisibility(false));
            }),
        );
    }

}
