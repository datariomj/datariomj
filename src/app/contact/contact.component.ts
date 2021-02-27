import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit {
  constructor(
    private seo: SeoService,
  ) { }

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'MJ Datario | Contact',
      description: 'Contact',
      image: '/assets/images/placeholder.jpg',
      slug: 'contact',
    });
  }
}
