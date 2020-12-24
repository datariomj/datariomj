import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'C:/Program Files/Git/', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, { path: 'C:/Program Files/Git/', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) }, { path: 'C:/Program Files/Git/terms', loadChildren: () => import('./terms/terms.module').then(m => m.TermsModule) }, { path: 'C:/Program Files/Git/privacy', loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule) }, { path: 'C:/Program Files/Git/cv', loadChildren: () => import('./cv/cv.module').then(m => m.CvModule) }, { path: 'C:/Program Files/Git/cv', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) }, { path: 'C:/Program Files/Git/stack', loadChildren: () => import('./stack/stack.module').then(m => m.StackModule) }, { path: '**', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
