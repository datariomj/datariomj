import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '@core/services/seo.service';
import { Select, Store } from '@ngxs/store';
import { ContactFormVisibility } from '@store/ui/ui.action';
import { Observable } from 'rxjs';

import { GetReadme } from './store/home.actions';
import { HomeState } from './store/home.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  @Select(HomeState.getReadme) readme$!: Observable<string>;

  constructor(
    private store: Store,
    private seo: SeoService,
  ) {
  }

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'MJ Datario | Home',
      description: 'Home',
      image: '/assets/images/placeholder.jpg',
      slug: 'home',
    });
    this.store.dispatch(new GetReadme());
  }

  openContactDialog() {
    this.store.dispatch(new ContactFormVisibility(true));
  }

  openGithubReadme() {

  }
}
