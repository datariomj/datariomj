import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '@core/services/seo.service';
import { STATIC_CONSTANT } from '@core/static.constants';
import { environment } from '@env/environment';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent implements OnInit {
  email: string = STATIC_CONSTANT.email;
  hostUrl: string = environment.hostUrl;

  constructor(
    private seo: SeoService,
  ) { }

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'MJ Datario | Privacy Policy',
      description: 'Privacy Policy',
      image: '/assets/images/placeholder.jpg',
      slug: 'privacy',
    });
  }
}
