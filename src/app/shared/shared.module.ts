import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { ContactDialogComponent } from './components/contact-dialog/contact-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UnfinishedComponent } from './components/unfinished/unfinished.component';
import { ContentfulAssetDirective } from './directives/contentful-asset.directive';
import { HtmlTagsDirective } from './directives/html-tags.directive';
import { MdToHtmlPipe } from './pipes/mdToHtml.pipe';
import { RichTextToHtmlPipe } from './pipes/richTextToHtml.pipe';



@NgModule({
  declarations: [
    SidenavComponent,
    FooterComponent,
    PreloaderComponent,
    ContactDialogComponent,
    ContentfulAssetDirective,
    RichTextToHtmlPipe,
    MdToHtmlPipe,
    HtmlTagsDirective,
    UnfinishedComponent,
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
  ],
  exports: [
    SidenavComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    PreloaderComponent,
    HtmlTagsDirective,
    ReactiveFormsModule,
    ContactDialogComponent,
    ContentfulAssetDirective,
    RichTextToHtmlPipe,
    MdToHtmlPipe,
    UnfinishedComponent,
  ],
})
export class SharedModule { }
