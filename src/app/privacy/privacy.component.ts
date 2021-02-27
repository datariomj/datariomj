import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PrivacyComponent implements OnInit {
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
