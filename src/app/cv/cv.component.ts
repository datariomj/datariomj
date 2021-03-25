import { BreakpointObserver } from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '@core/services/seo.service';
import { AddDetail, GetItems, RemoveDetail, SelectEntryId } from '@cv/store/cv.actions';
import { CvState } from '@cv/store/cv.state';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { CvDetail } from './interfaces/cv-detail';
import { CvFlatNode } from './interfaces/cv-flat-node';
import { CvNodeDetail } from './interfaces/cv-node-detail';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  entryId$!: Observable<string | null | undefined>;
  details$!: Observable<CvDetail[] | null | undefined>;
  isLarge = false;
  autosize = true;
  deletedIndex = -1;
  treeControl = new FlatTreeControl<CvFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener((node: CvNodeDetail, level: number) => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    route: node.route || '',
  }), node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  private $unsubsriber = new Subject<any>();

  constructor(
    public breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private seo: SeoService,
  ) {
  }

  hasChild = (_: number, node: CvFlatNode) => node.expandable;

  ngOnInit() {
    this.initStoreEvents();
    this.initBreakpointEvents();
    this.seo.generateTags({
      title: 'MJ Datario | CV',
      description: 'Curriculum Vitae',
      image: '/assets/images/placeholder.jpg',
      slug: 'cv',
    });
    this.store.dispatch(new GetItems());
  }

  ngOnDestroy() {
    this.cdRef.detach();
    this.$unsubsriber.next();
    this.$unsubsriber.complete();
  }

  toggleNode(node: CvFlatNode): void {
    if (this.treeControl.isExpanded(node)) {
      this.treeControl.collapse(node);

      return;
    }

    this.treeControl.expand(node);
  }

  goToDetail(entryId: string) {
    if (entryId) {
      this.router.navigate([entryId], { relativeTo: this.route });
    }
  }

  removeDetail($event: MouseEvent, entryId: string, deletedIndex: number) {
    $event.stopPropagation();
    this.deletedIndex = deletedIndex;
    this.store.dispatch(new RemoveDetail(entryId));
  }

  selectDetail() {
    if (!this.isLarge) {
      this.drawer?.close();
    }
  }

  private initStoreEvents() {
    this.store.select(CvState.getItems).pipe(
      takeUntil(this.$unsubsriber),
    ).subscribe((cv) => {
      this.autosize = true;

      if (cv) {
        this.dataSource.data = cv;
        this.treeControl.expandAll();
      }

      setTimeout(() => this.autosize = false, 10);
    });

    this.details$ = this.store.select(CvState.getDetails).pipe(
      tap((cvDetails) => {
        const selectedEntryId = this.store.selectSnapshot(CvState.getSelectedEntryId);

        if (cvDetails) {
          let newEntryId = null;

          if (cvDetails.length) {
            if (selectedEntryId) {
              const selectedDetail = cvDetails.find(detail => detail.entryId === selectedEntryId);
              newEntryId = selectedDetail?.entryId || null;

              if (!selectedDetail && this.deletedIndex !== -1) {
                const previousSelectedDetail = cvDetails[this.deletedIndex - 1] || cvDetails[this.deletedIndex];

                newEntryId = previousSelectedDetail?.entryId || null;
                this.deletedIndex = -1;
              }

              if (newEntryId) {
                this.router.navigate([newEntryId], { relativeTo: this.route });
              }
            }

            this.cdRef.detectChanges();
          } else {
            this.router.navigate(['cv']).then(() => {
              this.drawer.open();
            });
          }

          return;
        }

        if (selectedEntryId) {
          this.store.dispatch(new SelectEntryId(''));
        }
      }),
    );

    this.entryId$ = this.store.select(CvState.getSelectedEntryId).pipe(
      takeUntil(this.$unsubsriber),
      tap((entryId) => {
        if (!entryId) {
          this.router.navigate(['cv']);

          return;
        }

        if (!this.isLarge) {
          this.drawer?.close();
        }

        this.cdRef.detectChanges();
        this.store.dispatch(new AddDetail(entryId));
      }),
    );
  }

  private initBreakpointEvents() {
    this.breakpointObserver.observe([
      '(min-width: 1280px)',
    ]).subscribe(result => {
      this.isLarge = result.matches;
      this.autosize = true;

      if (this.isLarge) {
        this.drawer?.open();
      }

      this.cdRef.detectChanges();
      setTimeout(() => this.autosize = false, 10);
    });
  }
}
