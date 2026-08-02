import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private doc = inject<Document>(DOCUMENT);
  private title = inject(Title);
  private meta = inject(Meta);

  private getOrigin(): string {
    try {
      return new URL(this.doc.URL).origin;
    } catch {
      return '';
    }
  }

  private toAbsoluteUrl(url: string): string {
    if (!url) return url;
    try {
      const base = this.getOrigin() || this.doc.URL;
      return new URL(url, base).toString();
    } catch {
      return url;
    }
  }

  private toAbsoluteSlugUrl(slug?: string): string {
    if (!slug) return this.doc.URL;
    try {
      const cleanSlug = slug.replace(/^\//, '');
      const base = this.getOrigin() || this.doc.URL;
      return new URL(`/${ cleanSlug }`, base).toString();
    } catch {
      return this.doc.URL;
    }
  }


  generateTags(config: Partial<{ title: string; description: string; keywords: string; image: string; slug: string; }>): void {
    const finalConfig = {
      title: 'MJ Datario',
      description: 'Marc Joseph Datario\'s portfolio',
      keywords: 'datariomj datariomj-dev datariomj.dev mjdatario hire full-stack web developer software devops engineer mj marc joseph datario',
      image: '/assets/images/leaves.jpg',
      slug: '',
      ...config,
    };

    finalConfig.image = this.toAbsoluteUrl(finalConfig.image);

    const host = (() => {
      try {
        return new URL(this.doc.URL).host;
      } catch {
        return '';
      }
    })();

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
    this.meta.updateTag({ property: 'og:site_name', content: host || 'datariomj.dev' });
    this.meta.updateTag({ property: 'og:title', content: finalConfig.title });
    this.meta.updateTag({ property: 'og:description', content: finalConfig.description });
    this.meta.updateTag({ property: 'og:image', content: finalConfig.image });
    this.meta.updateTag({ property: 'og:url', content: this.toAbsoluteSlugUrl(finalConfig.slug) });

    this.setCanonicalURL(finalConfig.slug);
  }

  setCanonicalURL(slug?: string): void {
    let link: HTMLLinkElement | null = this.doc.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', this.toAbsoluteSlugUrl(slug));
  }
}
