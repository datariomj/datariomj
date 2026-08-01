import { DOCUMENT } from '@angular/common';
import { inject,Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private doc = inject<Document>(DOCUMENT);
  private title = inject(Title);
  private meta = inject(Meta);


  generateTags(config: Partial<{ title: string; description: string; keywords: string; image: string; slug: string }>): void {
    const finalConfig = {
      title: 'MJ Datario',
      description: 'Marc Joseph Datario\'s portfolio',
      keywords: 'datariomj datariomj-dev datariomj.dev mjdatario hire full-stack web developer software devops engineer mj marc joseph datario',
      image: '/assets/images/leaves.jpg',
      slug: '',
      ...config,
    };

    if (environment.production) {
      finalConfig.image = `${ environment.hostUrl }${ finalConfig.image }`;
    }

    this.title.setTitle(finalConfig.title);

    this.meta.updateTag({ name: 'description', content: finalConfig.description });
    this.meta.updateTag({ name: 'keywords', content: finalConfig.keywords });
    // todo add keywords

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@datariomj' });
    this.meta.updateTag({ name: 'twitter:title', content: finalConfig.title });
    this.meta.updateTag({ name: 'twitter:description', content: finalConfig.description });
    this.meta.updateTag({ name: 'twitter:image', content: finalConfig.image });

    this.meta.updateTag({ name: 'fb:app_id', content: environment.facebook.appId });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'datariomj.dev' });
    this.meta.updateTag({ property: 'og:title', content: finalConfig.title });
    this.meta.updateTag({ property: 'og:description', content: finalConfig.description });
    this.meta.updateTag({ property: 'og:image', content: finalConfig.image });
    this.meta.updateTag({ property: 'og:url', content: `${ environment.hostUrl }/${ finalConfig.slug }` });

    this.setCanonicalURL(finalConfig.slug);
  }

  setCanonicalURL(slug?: string): void {
    let link: HTMLLinkElement | null = this.doc.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    const targetUrl = slug ? `${ environment.hostUrl }/${ slug.replace(/^\//, '') }` : this.doc.URL;
    link.setAttribute('href', targetUrl);
  }
}
