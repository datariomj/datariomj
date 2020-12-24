import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StackRoutingModule } from './stack-routing.module';
import { StackComponent } from './stack.component';


@NgModule({
  declarations: [StackComponent],
  imports: [
    CommonModule,
    StackRoutingModule
  ]
})
export class StackModule { }
