import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TermsComponent implements OnInit {
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
