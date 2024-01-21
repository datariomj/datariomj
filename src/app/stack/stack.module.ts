import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '@shared/shared.module';

import { StackCardComponent } from './components/stack-card/stack-card.component';
import { StackComponent } from './stack.component';
import { StackRoutingModule } from './stack-routing.module';
import { StackState } from './store/stack.state';

@NgModule({
  declarations: [StackComponent, StackCardComponent],
  imports: [
    CommonModule,
    StackRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    SharedModule,
    NgxsModule.forFeature([
      StackState,
    ]),
  ],
})
export class StackModule { }
