import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { SharedModule } from '@shared/shared.module';

import { CvComponent } from './cv.component';
import { CvRoutingModule } from './cv-routing.module';


@NgModule({
  declarations: [CvComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    MatTreeModule,
    SharedModule,
  ],
})
export class CvModule { }
