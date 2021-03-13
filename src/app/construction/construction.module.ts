import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConstructionComponent } from './construction.component';
import { ConstructionRoutingModule } from './construction-routing.module';


@NgModule({
  declarations: [ConstructionComponent],
  imports: [
    CommonModule,
    ConstructionRoutingModule,
  ],
})
export class ConstructionModule { }
