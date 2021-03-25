import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CvDefaultComponent } from './cv-default.component';

const routes: Routes = [{ path: '', component: CvDefaultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvDefaultRoutingModule { }
