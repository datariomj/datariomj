import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '@core/services/seo.service';

import { TerminalHeroComponent } from '../shared/components/terminal-hero/terminal-hero.component';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TerminalHeroComponent],
})
export class ErrorComponent implements OnInit {
  private seo = inject(SeoService);
  private router = inject(Router);

  currentDateString = '';
  slug = '';

  ngOnInit(): void {
    this.currentDateString = new Date().toUTCString();
    // Get the route path and trim leading slash
    this.slug = this.router.url.replace(/^\//, '') || 'unknown-route';

    this.seo.generateTags({
      title: '404 Error',
      description: 'Page does not exist',
      image: '/assets/images/placeholder.jpg',
      slug: 'error',
    });
  }
}

