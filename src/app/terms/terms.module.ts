import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TermsComponent } from './terms.component';
import { TermsRoutingModule } from './terms-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TermsComponent,
    TermsRoutingModule,
  ],
})
export class TermsModule { }
