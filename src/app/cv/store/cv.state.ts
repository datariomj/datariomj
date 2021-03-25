import { Injectable } from '@angular/core';
import { CvService } from '@cv/cv.service';
import { CvDetail } from '@cv/interfaces/cv-detail';
import { CvFlatNode } from '@cv/interfaces/cv-flat-node';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { PreloaderVisibility } from '@store/ui/ui.action';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { AddDetail, GetItems, RemoveDetail, SelectEntryId } from './cv.actions';

export interface CvStateModel {
    items: CvFlatNode[] | null;
    details: CvDetail[];
    selectedEntryId: string;
}

@State<CvStateModel>({
    name: 'cv',
    defaults: {
        items: null,
        details: [],
        selectedEntryId: '',
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

    @Selector()
    public static getDetails(state: CvStateModel): CvDetail[] {
        return state.details;
    }

    @Selector()
    public static getSelectedEntryId(state: CvStateModel) {
        return state.selectedEntryId;
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

    @Action(AddDetail)
    addDetail({ patchState, getState }: StateContext<CvStateModel>, action: AddDetail) {
        const state = getState();
        const existingDetail = state && state.details.find(detail => detail.entryId === action.entryId);

        if (!action.entryId || existingDetail) {
            patchState({
                details: [...state.details],
            });

            return;
        }

        this.store.dispatch(new PreloaderVisibility(true));

        return this.cvService.getCvDetail(action.entryId).pipe(
            tap((cvDetail) => {
                patchState({
                    details: [...state.details, cvDetail],
                });
            }),
            finalize(() => {
                this.store.dispatch(new PreloaderVisibility(false));
            }),
            catchError(() => EMPTY),
        );
    }

    @Action(RemoveDetail)
    removeDetail({ patchState, getState }: StateContext<CvStateModel>, action: AddDetail) {
        const state = getState();
        const existingDetailIndex = state && state.details.findIndex(detail => detail.entryId === action.entryId);

        if (typeof existingDetailIndex === 'undefined') {
            patchState({
                details: [...state.details],
            });

            return;
        }

        patchState({
            details: state.details.filter((detail, index) => index !== existingDetailIndex),
        });
    }

    @Action(SelectEntryId)
    selectEntryId({ patchState }: StateContext<CvStateModel>, action: SelectEntryId) {
        patchState({
            selectedEntryId: action.entryId,
        });
    }

}
