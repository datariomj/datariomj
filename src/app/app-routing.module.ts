import { NgModule } from '@angular/core';
import { LoadChildrenCallback, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';
import { NavigationLink } from '@shared/interfaces/navigation-link';

function buildNavigationRoutes(links: NavigationLink[]): Routes {
  return links.map((link) => ({
    path: link.path.replace(/^\//, ''),
    loadChildren: link.loadChildren as LoadChildrenCallback,
  }));
}

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    pathMatch: 'full',
  },
  ...buildNavigationRoutes(environment.navigation),
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then(m => m.TermsModule),
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule),
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),
  },
];

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
