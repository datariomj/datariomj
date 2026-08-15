import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Experience } from './experience';

const routes: Routes = [{ path: '', component: Experience }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperienceRoutingModule { }
