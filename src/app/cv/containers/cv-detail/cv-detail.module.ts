import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { SharedModule } from '@shared/shared.module';

import { CvDetailComponent } from './cv-detail.component';
import { CvDetailRoutingModule } from './cv-detail-routing.module';


@NgModule({
  declarations: [CvDetailComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    SharedModule,
    CvDetailRoutingModule,
  ],
})
export class DetailModule { }
