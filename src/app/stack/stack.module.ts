import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StackComponent } from './stack.component';
import { StackRoutingModule } from './stack-routing.module';


@NgModule({
  declarations: [StackComponent],
  imports: [
    CommonModule,
    StackRoutingModule,
  ],
})
export class StackModule { }
