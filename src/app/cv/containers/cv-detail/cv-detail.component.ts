import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CvDetail } from '@cv/interfaces/cv-detail';
import { SelectEntryId } from '@cv/store/cv.actions';
import { CvState } from '@cv/store/cv.state';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './cv-detail.component.html',
  styleUrls: ['./cv-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvDetailComponent implements OnInit, OnDestroy {
  detail$!: Observable<CvDetail | null | undefined>;

  private $unsubsriber = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.initStoreEvents();
    this.initRouteEvents();
  }

  ngOnDestroy() {
    this.$unsubsriber.next(1);
    this.$unsubsriber.complete();
  }

  private initRouteEvents() {
    this.route.params.pipe(
      takeUntil(this.$unsubsriber),
    ).subscribe(params => {
      this.store.dispatch(new SelectEntryId(params.detail));
    });
  }

  private initStoreEvents() {
    this.detail$ = this.store.select(CvState.getDetails).pipe(
      takeUntil(this.$unsubsriber),
      map((cvDetails) => cvDetails.find((detail) => detail.entryId === this.store.selectSnapshot<string>(CvState.getSelectedEntryId))),
    );
  }
}
