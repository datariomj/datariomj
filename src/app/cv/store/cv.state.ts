import { Injectable } from '@angular/core';
import { CvService } from '@cv/cv.service';
import { CvFlatNode } from '@cv/interfaces/cv-flat-node';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { PreloaderVisibility } from '@store/ui/ui.action';
import { finalize, tap } from 'rxjs/operators';

import { GetItems as GetItems } from './cv.actions';

export interface CvStateModel {
    items: CvFlatNode[] | null;
}

@State<CvStateModel>({
    name: 'cv',
    defaults: {
        items: null,
    },
})
@Injectable()
export class CvState {
    constructor(
        private cvService: CvService,
        private store: Store,
    ) {
    }

    @Selector()
    public static getItems(state: CvStateModel) {
        return state.items;
    }

    @Action(GetItems)
    getItems({ patchState, getState }: StateContext<CvStateModel>) {
        const state = getState();

        if (state && state.items) {
            return;
        }

        this.store.dispatch(new PreloaderVisibility(true));

        return this.cvService.getCv().pipe(
            tap(cv => {
                patchState({
                    items: cv,
                });
            }),
            finalize(() => {
                this.store.dispatch(new PreloaderVisibility(false));
            }),
        );
    }

}
