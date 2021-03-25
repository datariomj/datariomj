import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CvDetailComponent } from './cv-detail.component';

const routes: Routes = [{ path: '', component: CvDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvDetailRoutingModule { }
