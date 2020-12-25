import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { CvComponent } from './cv.component';

const routes: Routes = [{ path: '', component: CvComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvRoutingModule { }
