import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CvFlatNode } from './interfaces/cv-flat-node';
import { CvNodeDetail } from './interfaces/cv-node-detail';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
    private http: HttpClient,
  ) {
  }

  hasChild = (_: number, node: CvFlatNode) => node.expandable;

  ngOnInit() {
    // todo get from api and create interfaces
    this.http.get('/assets/json/cv.json').pipe(
      takeUntil(this.$unsubsriber),
    ).subscribe((cv: any) => {
      this.dataSource.data = cv.data;
      this.treeControl.expandAll();
    });
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
