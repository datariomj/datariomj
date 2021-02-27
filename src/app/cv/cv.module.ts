import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '@shared/shared.module';

import { CvComponent } from './cv.component';
import { CvRoutingModule } from './cv-routing.module';
import { CvState } from './store/cv.state';


@NgModule({
  declarations: [CvComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    MatTreeModule,
    SharedModule,
    NgxsModule.forFeature([
      CvState,
    ]),
  ],
})
export class CvModule { }
