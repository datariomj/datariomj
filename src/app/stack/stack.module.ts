import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StackComponent } from './stack.component';
import { StackRoutingModule } from './stack-routing.module';

@NgModule({
    imports: [
    CommonModule,
    StackRoutingModule,
    StackComponent,
],
})
export class StackModule { }
