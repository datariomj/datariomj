import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorComponent } from './error.component';
import { ErrorRoutingModule } from './error-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorComponent,
    ErrorRoutingModule,
  ],
})
export class ErrorModule { }
