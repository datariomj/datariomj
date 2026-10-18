import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Projects } from './projects';
import { ProjectsRoutingModule } from './projects-routing-module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    Projects,
  ],
})
export class ProjectsModule { }
