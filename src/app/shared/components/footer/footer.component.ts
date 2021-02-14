import { Component, ViewEncapsulation } from '@angular/core';
import { IconService } from '@core/services/icon.service';
import { Store } from '@ngxs/store';
import { ToggleSidenav } from '@shared/state/app.action';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
  icons = [
    'chevron-right',
    'git',
    'copyright',
    'linked_in',
    'github',
    'instagram',
  ];
  currentYear = new Date().getFullYear();
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
    private store: Store,
    private iconService: IconService,
  ) {
    this.icons.forEach((icon) => {
      this.iconService.addSvgIcon(icon);
    });
  }

  toggleSidenav() {
    this.store.dispatch(new ToggleSidenav());
    // todo animate chevron
  }
}