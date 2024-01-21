import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    pathMatch: 'full',
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
    path: 'cv',
    loadChildren: () => import('./cv/cv.module').then(m => m.CvModule),
  },
  {
    path: 'blog',
    // loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
    loadChildren: () => import('./construction/construction.module').then(m => m.ConstructionModule),
  },
  {
    path: 'stack',
    // loadChildren: () => import('./stack/stack.module').then(m => m.StackModule),
    loadChildren: () => import('./construction/construction.module').then(m => m.ConstructionModule),
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
