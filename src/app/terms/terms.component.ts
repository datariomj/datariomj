import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject,OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '@core/services/seo.service';
import { STATIC_CONSTANT } from '@core/static.constants';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent implements OnInit {
  private seo = inject(SeoService);
  private doc = inject<Document>(DOCUMENT);

  email: string = STATIC_CONSTANT.email;
  hostUrl: string = (() => {
    try {
      return new URL(this.doc.URL).origin;
    } catch {
      return '';
    }
  })();

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'MJ Datario | Terms & Conditions',
      description: 'Terms and Conditions',
      image: '/assets/images/placeholder.jpg',
      slug: 'terms',
    });
  }
}
