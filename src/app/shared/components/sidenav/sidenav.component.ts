import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent {
  icons = [
    'home',
    'cv',
    'stack',
    'blog',
    'contact',
  ];
  navLinks = [
    { icon: 'home', route: '' },
    { icon: 'cv', route: '/cv' },
    { icon: 'stack', route: '/stack' },
    { icon: 'blog', route: '/blog' },
    { icon: 'contact', route: '/contact' },
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
