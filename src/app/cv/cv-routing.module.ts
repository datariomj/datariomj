import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { CvComponent } from './cv.component';

const routes: Routes = [
  {
    path: '',
    component: CvComponent,
    children: [
      { path: '', loadChildren: () => import('./containers/cv-default/cv-default.module').then(m => m.CvDefaultModule) },
      { path: ':detail', loadChildren: () => import('./containers/cv-detail/cv-detail.module').then(m => m.DetailModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvRoutingModule { }
