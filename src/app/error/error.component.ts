import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
  constructor(
    private seo: SeoService,
  ) { }

  ngOnInit(): void {
    this.seo.generateTags({
      title: '404 Error',
      description: 'Page does not exists',
      image: '/assets/images/placeholder.jpg',
      slug: 'error',
    });
  }
}
