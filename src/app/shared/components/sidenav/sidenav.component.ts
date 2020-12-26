import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Select } from '@ngxs/store';
import { AppState } from '@shared/state/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent {
  @Select(AppState.sidenavExpanded) sidenavExpanded$!: Observable<boolean>;

  icons = [
    'home',
    'cv',
    'stack',
    'blog',
    'contact',
  ];
  navLinks = [
    { icon: 'home', route: '', description: 'Home' },
    { icon: 'cv', route: '/cv', description: 'CV' },
    { icon: 'stack', route: '/stack', description: 'Stack' },
    { icon: 'blog', route: '/blog', description: 'Blog' },
    { icon: 'contact', route: '/contact', description: 'Contact' },
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/svg/${ icon }.svg`),
      );
    });
  }
}
