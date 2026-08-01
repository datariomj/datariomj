import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about-module').then(m => m.AboutModule),
  },
  {
    path: 'experience',
    loadChildren: () => import('./experience/experience-module').then(m => m.ExperienceModule),
  },
  {
    path: 'stack',
    loadChildren: () => import('./stack/stack.module').then(m => m.StackModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact-module').then(m => m.ContactModule),
  },
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
