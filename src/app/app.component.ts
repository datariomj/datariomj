import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UIState } from 'src/store/ui/ui.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  showPreloader!: boolean;
  title = 'datariomj';

  constructor(
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
  }
}
