import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { routes } from './app.routes';

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    preloadingStrategy: PreloadAllModules,
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
