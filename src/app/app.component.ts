import { DOCUMENT } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, ViewEncapsulation } from "@angular/core";
import { Event, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Store } from "@ngxs/store";
import { UIState } from "src/store/ui/ui.state";

import { FooterComponent } from "./shared/components/footer/footer.component";
import { NavigationComponent } from "./shared/components/navigation/navigation.component";
import { PreloaderComponent } from "./shared/components/preloader/preloader.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, FooterComponent, PreloaderComponent, NavigationComponent],
})
export class AppComponent implements OnInit {
  private doc = inject<Document>(DOCUMENT);
  private router = inject(Router);
  private store = inject(Store);
  private cdRef = inject(ChangeDetectorRef);

  showPreloader!: boolean;
  title = "datariomj";

  ngOnInit() {
    this.initRoutingEvents();
    this.initStoreEvents();
  }

  private initRoutingEvents(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Standard window scroll
        this.doc.defaultView?.scrollTo(0, 0);
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
