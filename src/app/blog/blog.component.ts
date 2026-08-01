import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'MJ Datario | Blog',
      description: 'Blog',
      image: '/assets/images/placeholder.jpg',
      slug: 'blog',
    });
  }
}
