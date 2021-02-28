import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IconService } from '@core/services/icon.service';
import { STATIC_CONSTANT } from '@core/static.constants';
import { Store } from '@ngxs/store';
import { ToggleSidenav } from '@store/ui/ui.action';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  email: string = STATIC_CONSTANT.email;
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
