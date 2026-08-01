import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { About } from './about';
import { AboutRoutingModule } from './about-routing-module';


@NgModule({
    imports: [
    CommonModule,
    AboutRoutingModule,
    About,
],
})
export class AboutModule { }
