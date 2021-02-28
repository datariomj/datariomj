import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SeoService } from '@core/services/seo.service';
import { GetItems } from '@cv/store/cv.actions';
import { CvState } from '@cv/store/cv.state';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private store: Store,
    private seo: SeoService,
  ) {
  }

  hasChild = (_: number, node: CvFlatNode) => node.expandable;

  ngOnInit() {
    this.seo.generateTags({
      title: 'MJ Datario | CV',
      description: 'Curriculum Vitae',
      image: '/assets/images/placeholder.jpg',
      slug: 'cv',
    });

    this.store.select(CvState.getItems).pipe(
      takeUntil(this.$unsubsriber),
    ).subscribe((cv) => {
      if (cv) {
        this.dataSource.data = cv;
        this.treeControl.expandAll();
      }
    });
    this.store.dispatch(new GetItems());
  }

  ngOnDestroy() {
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
}
