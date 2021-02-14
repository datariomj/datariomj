import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';


@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
  ],
})
export class DetailModule { }
