import { Injectable } from '@angular/core';
import { CvService } from '@cv/cv.service';
import { CvFlatNode } from '@cv/interfaces/cv-flat-node';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { PreloaderVisibility } from '@store/ui/ui.action';
import { finalize, tap } from 'rxjs/operators';

import { Cv } from '../interfaces/cv';
import { GetData } from './cv.actions';

export interface CvStateModel {
    data: Cv | null;
}

@State<CvStateModel>({
    name: 'cv',
    defaults: {
        data: null,
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
    public static getData(state: CvStateModel) {
        return state.data;
    }

    @Action(GetData)
    getData({ patchState, getState }: StateContext<CvStateModel>) {
        const state = getState();

        if (state && state.data) {
            return;
        }

        return this.cvService.getCv().pipe(
            tap(() => {
                this.store.dispatch(new PreloaderVisibility(true));
            }),
            tap(cv => {
                patchState({
                    data: cv,
                });
            }),
            finalize(() => {
                this.store.dispatch(new PreloaderVisibility(false));
            }),
        );
    }

}
