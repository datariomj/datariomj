import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstructionRoutingModule } from './construction-routing.module';
import { ConstructionComponent } from './construction.component';


@NgModule({
  declarations: [ConstructionComponent],
  imports: [
    CommonModule,
    ConstructionRoutingModule
  ]
})
export class ConstructionModule { }
