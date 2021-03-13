import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { ContactDialogComponent } from './components/contact-dialog/contact-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ContentfulAssetDirective } from './directives/contentful-asset.directive';
import { HtmlTagsDirective } from './directives/html-tags.directive';
import { MdToHtmlPipe } from './pipes/mdToHtml.pipe';



@NgModule({
  declarations: [
    SidenavComponent,
    FooterComponent,
    PreloaderComponent,
    ContactDialogComponent,
    ContentfulAssetDirective,
    MdToHtmlPipe,
    HtmlTagsDirective,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    SidenavComponent,
    FooterComponent,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    PreloaderComponent,
    HtmlTagsDirective,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ContactDialogComponent,
    ContentfulAssetDirective,
    MdToHtmlPipe,
  ],
})
export class SharedModule { }
