import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
  },
  {
    path: 'terms', loadChildren: () => import('./terms/terms.module').then(m => m.TermsModule),
  },
  {
    path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule),
  },
  {
    path: 'cv', loadChildren: () => import('./cv/cv.module').then(m => m.CvModule),
  },
  {
    path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
  },
  {
    path: 'stack', loadChildren: () => import('./stack/stack.module').then(m => m.StackModule),
  },
  {
    path: '**', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
