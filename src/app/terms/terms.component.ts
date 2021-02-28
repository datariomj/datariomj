import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '@core/services/seo.service';
import { STATIC_CONSTANT } from '@core/static.constants';
import { environment } from '@env/environment';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent implements OnInit {
  email: string = STATIC_CONSTANT.email;
  hostUrl: string = environment.hostUrl;

  constructor(
    private seo: SeoService,
  ) { }

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'MJ Datario | Terms & Conditions',
      description: 'Terms and Conditions',
      image: '/assets/images/placeholder.jpg',
      slug: 'terms',
    });
  }
}
