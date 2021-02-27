import { Injectable } from '@angular/core';
import { CvService } from '@cv/cv.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Stack } from '@stack/interfaces/stack';
import { StackItem } from '@stack/interfaces/stack-item';
import { StackService } from '@stack/stack.service';
import { PreloaderVisibility } from '@store/ui/ui.action';
import { finalize, tap } from 'rxjs/operators';

import { GetData } from './stack.actions';

export interface StackStateModel {
    data: Stack | null;
}

@State<StackStateModel>({
    name: 'stack',
    defaults: {
        data: null,
    },
})
@Injectable()
export class StackState {
    constructor(
        private stackService: StackService,
        private store: Store,
    ) {
    }

    @Selector()
    public static getData(state: StackStateModel) {
        return state.data;
    }

    @Action(GetData)
    getData({ patchState, getState }: StateContext<StackStateModel>, action: GetData) {
        const state = getState();

        if (state && state.data) {
            return;
        }

        return this.stackService.getStack().pipe(
            tap(() => {
                this.store.dispatch(new PreloaderVisibility(true));
            }),
            tap(stack => {
                patchState({
                    data: stack,
                });
            }),
            finalize(() => {
                this.store.dispatch(new PreloaderVisibility(false));
            }),
        );
    }

}
