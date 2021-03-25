import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeState } from './store/home.state';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatTabsModule,
    NgxsModule.forFeature([
      HomeState,
    ]),
  ],
})
export class HomeModule { }
