import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { StackCardComponent } from './components/stack-card/stack-card.component';
import { StackIconComponent } from './components/stack-icon/stack-icon.component';
import { StackComponent } from './stack.component';
import { StackRoutingModule } from './stack-routing.module';

@NgModule({
  declarations: [StackComponent, StackCardComponent, StackIconComponent],
  imports: [
    CommonModule,
    StackRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
  ],
})
export class StackModule { }
