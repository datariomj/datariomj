import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UIState } from 'src/store/ui/ui.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @Select(UIState.showPreloader) showPreloader$!: Observable<boolean>;
  title = 'datariomj';

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.initRoutingEvents();
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
}
