import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StackComponent } from './stack.component';

const routes: Routes = [{ path: '', component: StackComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StackRoutingModule { }
