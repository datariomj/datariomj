import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Contact } from './contact';
import { ContactRoutingModule } from './contact-routing-module';



@NgModule({
    imports: [
    CommonModule,
    ContactRoutingModule,
    Contact,
],
})
export class ContactModule { }
