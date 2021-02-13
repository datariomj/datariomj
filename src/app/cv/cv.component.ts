import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';

interface CVDetail {
  name: string;
  route?: string;
  children?: CVDetail[];
}

const TREE_DATA: CVDetail[] = [
  {
    name: 'Work Experience',
    children: [
      {
        name: 'Solutions Developer',
      },
      {
        name: 'DevOps Engineer',
      },
      {
        name: 'Software Engineer',
      },
      {
        name: 'Associate Software Engineer',
      },
      {
        name: 'Junior Software Engineer',
      },
      {
        name: 'Software Engineer Intern',
      },
    ],
  },
  {
    name: 'Certification',
    children: [
      {
        name: 'AWS Certified Solutions Architect - Associate',
      },
    ],
  },
  {
    name: 'Education',
    children: [
      {
        name: 'BS in Computer Engineering',
      },
    ],
  },
  {
    name: 'Projects',
    children: [
      {
        name: 'datariomj-dev.firebaseapp.com',
      },
      {
        name: 'christinemanrique.com',
      },
    ],
  },
];

interface CVFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CvComponent implements AfterViewInit {
  // transformer = (node: FoodNode, level: number) => ({
  //   expandable: !!node.children && node.children.length > 0,
  //   name: node.name,
  //   level,
  // });
  treeControl = new FlatTreeControl<CVFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener((node: CVDetail, level: number) => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
  }), node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: CVFlatNode) => node.expandable;

  ngAfterViewInit() {
    this.treeControl.expandAll();
  }
}
