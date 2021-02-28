import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Stack } from '@stack/interfaces/stack';
import { StackService } from '@stack/stack.service';
import { PreloaderVisibility } from '@store/ui/ui.action';
import { finalize, tap } from 'rxjs/operators';

import { GetItems as GetItems } from './stack.actions';

export interface StackStateModel {
    items: Stack | null;
}

@State<StackStateModel>({
    name: 'stack',
    defaults: {
        items: null,
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
    public static getItems(state: StackStateModel) {
        return state.items;
    }

    @Action(GetItems)
    getItems({ patchState, getState }: StateContext<StackStateModel>, action: GetItems) {
        const state = getState();

        if (state && state.items) {
            return;
        }

        this.store.dispatch(new PreloaderVisibility(true));

        return this.stackService.getStack().pipe(
            tap(stack => {
                patchState({
                    items: stack,
                });
            }),
            finalize(() => {
                this.store.dispatch(new PreloaderVisibility(false));
            }),
        );
    }

}
