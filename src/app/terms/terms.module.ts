import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TermsComponent } from './terms.component';
import { TermsRoutingModule } from './terms-routing.module';


@NgModule({
  declarations: [TermsComponent],
  imports: [
    CommonModule,
    TermsRoutingModule,
  ],
})
export class TermsModule { }
