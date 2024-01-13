import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ContactDialogComponent } from '@shared/components/contact-dialog/contact-dialog.component';
import { Contact } from '@shared/interfaces/contact';
import { take } from 'rxjs/operators';
import { UIState } from 'src/store/ui/ui.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  showPreloader!: boolean;
  title = 'datariomj';
  private dialogRef!: MatDialogRef<ContactDialogComponent>;

  constructor(
    public dialog: MatDialog,
    @Inject(DOCUMENT) private doc: Document,
    private router: Router,
    private store: Store,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.initRoutingEvents();
    this.initStoreEvents();
  }

  private initRoutingEvents(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const sidenavContent = this.doc.querySelector('.mat-drawer-content');

        if (sidenavContent) {
          sidenavContent.scrollTop = 0;
        }
      }
    });
  }

  private initStoreEvents(): void {
    this.store.select(UIState.showPreloader).subscribe((showPreloader) => {
      this.showPreloader = showPreloader;
      this.cdRef.detectChanges();
    });
    this.store.select(UIState.showContactForm).subscribe((showContactForm) => {
      if (showContactForm) {
        this.openContactDialog();
      } else {
        this.closeContactDialog();
      }
      this.cdRef.detectChanges();
    });
  }

  private openContactDialog() {
    this.dialogRef = this.dialog.open(ContactDialogComponent, { disableClose: true });

    this.dialogRef.afterClosed().pipe(
      take(1),
    ).subscribe((contactFormData: Contact) => {
      console.log(contactFormData);
    });
  }

  private closeContactDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
