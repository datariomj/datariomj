import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CvComponent } from './cv.component';
import { CvRoutingModule } from './cv-routing.module';


@NgModule({
  declarations: [CvComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
  ],
})
export class CvModule { }
