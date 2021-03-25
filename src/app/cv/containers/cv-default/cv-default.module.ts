import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CvDefaultComponent } from './cv-default.component';
import { CvDefaultRoutingModule } from './cv-default-routing.module';


@NgModule({
  declarations: [CvDefaultComponent],
  imports: [
    CommonModule,
    CvDefaultRoutingModule,
  ],
})
export class CvDefaultModule { }
