import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { provideStates } from "@ngxs/store";

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeState } from "./store/home.state";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeComponent,
    HomeRoutingModule,
  ],
  providers: [provideStates([HomeState])],
})
export class HomeModule {}
