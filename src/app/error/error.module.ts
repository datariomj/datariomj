import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorComponent } from './error.component';
import { ErrorRoutingModule } from './error-routing.module';


@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule,
  ],
})
export class ErrorModule { }
