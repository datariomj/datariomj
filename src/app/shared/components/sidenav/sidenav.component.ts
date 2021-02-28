import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IconService } from '@core/services/icon.service';
import { Select } from '@ngxs/store';
import { Contact } from '@shared/interfaces/contact';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UIState } from 'src/store/ui/ui.state';

import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent {
  @Select(UIState.sidenavExpanded) sidenavExpanded$!: Observable<boolean>;

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
  ];

  constructor(
    public dialog: MatDialog,
    private iconService: IconService,
  ) {
    this.icons.forEach((icon) => {
      this.iconService.addSvgIcon(icon);
    });
  }

  openContactDialog() {
    const dialogRef = this.dialog.open(ContactDialogComponent, { disableClose: true });

    dialogRef.afterClosed().pipe(
      take(1),
    ).subscribe((contactFormData: Contact) => {
      console.log(contactFormData);
    });
  }
}
