import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private title: Title,
    private meta: Meta,
  ) {
  }

  generateTags(config: any): void {
    config = {
      title: 'MJ Datario',
      description: 'Marc Joseph Datario\'s portfolio',
      // eslint-disable-next-line max-len
      keywords: 'datariomj datariomj-dev datariomj.dev mjdatario hire full-stack web developer software devops engineer mj marc joseph datario',
      image: '/assets/images/leaves.jpg',
      slug: '',
      ...config,
    };

    if (environment.production) {
      config.image = `${ environment.hostUrl }${ config.image }`;
    }

    this.title.setTitle(config.title);

    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: config.keywords });
    // todo add keywords

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@datariomj' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ name: 'fb:app_id', content: environment.facebook.appId });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'datariomj.dev' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `${ environment.hostUrl }/${ config.slug }` });
  }

  // createLinkForCanonicalURL() {
  //   const link: HTMLLinkElement = this.doc.createElement('link');
  //   link.setAttribute('rel', 'canonical');
  //   this.doc.head.appendChild(link);
  //   link.setAttribute('href', this.doc.URL);
  // }
}
