import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  icons = [
    'chevron-right',
    'git',
    'copyright',
    'linked_in',
    'github',
    'instagram',
  ];
  currentYear = new Date().getFullYear();
  currentVersion = environment.version;
  socialIcons = [
    {
      icon: 'github',
      link: 'https://github.com/datariomj',
    },
    {
      icon: 'instagram',
      link: 'https://www.instagram.com/datariomj',
    },
    {
      icon: 'linked_in',
      link: 'https://www.linkedin.com/in/datariomj',
    },
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

  ngOnInit(): void {
  }

}
