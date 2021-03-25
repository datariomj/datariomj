import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CvState } from '@cv/store/cv.state';
import { Store } from '@ngxs/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cv-default',
  templateUrl: './cv-default.component.html',
  styleUrls: ['./cv-default.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvDefaultComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.select(CvState.getSelectedEntryId).pipe(
      take(1),
    ).subscribe((selectedEntryId) => {
      const cvDetails = this.store.selectSnapshot(CvState.getDetails);
      const selectedDetail = cvDetails.find(detail => detail.entryId === selectedEntryId);
      const newEntryId = selectedDetail?.entryId || null;

      if (newEntryId) {
        this.router.navigate([newEntryId], { relativeTo: this.route });
      }
    });
  }

}
