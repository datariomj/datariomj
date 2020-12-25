import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';


@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
  ],
})
export class BlogModule { }
