import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { CvComponent } from './cv.component';

const routes: Routes = [
  {
    path: '',
    component: CvComponent,
    children: [
      { path: ':detail', loadChildren: () => import('./containers/detail/detail.module').then(m => m.DetailModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvRoutingModule { }
