import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Experience } from './experience';
import { ExperienceRoutingModule } from './experience-routing-module';


@NgModule({
    imports: [
    CommonModule,
    ExperienceRoutingModule,
    Experience,
],
})
export class ExperienceModule { }
