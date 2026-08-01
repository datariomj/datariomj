import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConstructionComponent } from './construction.component';
import { ConstructionRoutingModule } from './construction-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConstructionComponent,
    ConstructionRoutingModule,
  ],
})
export class ConstructionModule { }
