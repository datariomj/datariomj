import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let mockTitle: { setTitle: ReturnType<typeof vi.fn>; };
  let mockMeta: { updateTag: ReturnType<typeof vi.fn>; };
  let mockDocument: Document;

  beforeEach(() => {
    mockTitle = { setTitle: vi.fn() };
    mockMeta = { updateTag: vi.fn() };
    mockDocument = {
      ...document,
      querySelector: vi.fn().mockReturnValue(null),
      createElement: vi.fn().mockReturnValue({
        setAttribute: vi.fn(),
      }),
      head: {
        appendChild: vi.fn(),
      },
      URL: 'https://datariomj.dev/',
    } as unknown as Document;

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: mockTitle },
        { provide: Meta, useValue: mockMeta },
        { provide: DOCUMENT, useValue: mockDocument },
      ],
    });

    service = TestBed.inject(SeoService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('generateTags', () => {
    it('sets the page title', () => {
      service.generateTags({ title: 'My Page' });
      expect(mockTitle.setTitle).toHaveBeenCalledWith('My Page');
    });

    it('falls back to "MJ Datario" when title is not provided', () => {
      service.generateTags({});
      expect(mockTitle.setTitle).toHaveBeenCalledWith('MJ Datario');
    });

    it('updates description meta tag', () => {
      service.generateTags({ description: 'Test desc' });
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'description', content: 'Test desc' }),
      );
    });

    it('updates twitter:title meta tag', () => {
      service.generateTags({ title: 'Twitter Title' });
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'twitter:title', content: 'Twitter Title' }),
      );
    });

    it('updates og:title meta tag', () => {
      service.generateTags({ title: 'OG Title' });
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ property: 'og:title', content: 'OG Title' }),
      );
    });

    it('updates og:description meta tag', () => {
      service.generateTags({ description: 'OG Desc' });
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ property: 'og:description', content: 'OG Desc' }),
      );
    });

    it('sets twitter:card to "summary"', () => {
      service.generateTags({});
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'twitter:card', content: 'summary' }),
      );
    });

    it('sets twitter:site to "@datariomj"', () => {
      service.generateTags({});
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'twitter:site', content: '@datariomj' }),
      );
    });

    it('sets og:type to "website"', () => {
      service.generateTags({});
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ property: 'og:type', content: 'website' }),
      );
    });

    it('sets og:site_name to "datariomj.dev"', () => {
      service.generateTags({});
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ property: 'og:site_name', content: 'datariomj.dev' }),
      );
    });

    it('includes the slug in og:url', () => {
      service.generateTags({ slug: 'about' });
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ property: 'og:url', content: expect.stringContaining('/about') }),
      );
    });

    it('calls updateTag multiple times (all meta tags)', () => {
      service.generateTags({ title: 'Test' });
      expect(mockMeta.updateTag.mock.calls.length).toBeGreaterThan(5);
    });

    it('falls back gracefully when document URL is not a valid URL', () => {
      (mockDocument as unknown as { URL: string; }).URL = 'not-a-valid-url';
      service.generateTags({ slug: '/about', image: '/assets/images/x.png' });

      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ property: 'og:site_name', content: 'datariomj.dev' }),
      );
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'twitter:image', content: '/assets/images/x.png' }),
      );
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ property: 'og:url', content: 'not-a-valid-url' }),
      );
    });

    it('keeps an empty image value as-is', () => {
      service.generateTags({ image: '' });
      expect(mockMeta.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'twitter:image', content: '' }),
      );
    });
  });

  describe('setCanonicalURL', () => {
    it('creates a canonical link element when none exists', () => {
      (mockDocument.querySelector as ReturnType<typeof vi.fn>).mockReturnValue(null);
      const mockLink = { setAttribute: vi.fn() };
      (mockDocument.createElement as ReturnType<typeof vi.fn>).mockReturnValue(mockLink);

      service.setCanonicalURL('about');

      expect(mockDocument.createElement).toHaveBeenCalledWith('link');
      expect(mockLink.setAttribute).toHaveBeenCalledWith('rel', 'canonical');
      expect(mockDocument.head.appendChild).toHaveBeenCalledWith(mockLink);
    });

    it('reuses an existing canonical link element', () => {
      const existingLink = { setAttribute: vi.fn() };
      (mockDocument.querySelector as ReturnType<typeof vi.fn>).mockReturnValue(existingLink);

      service.setCanonicalURL('stack');

      expect(mockDocument.createElement).not.toHaveBeenCalled();
      expect(existingLink.setAttribute).toHaveBeenCalledWith('href', expect.stringContaining('stack'));
    });

    it('sets href to the full URL including slug', () => {
      const mockLink = { setAttribute: vi.fn() };
      (mockDocument.querySelector as ReturnType<typeof vi.fn>).mockReturnValue(mockLink);

      service.setCanonicalURL('contact');

      expect(mockLink.setAttribute).toHaveBeenCalledWith(
        'href',
        expect.stringContaining('/contact'),
      );
    });

    it('strips leading slash from slug', () => {
      const mockLink = { setAttribute: vi.fn() };
      (mockDocument.querySelector as ReturnType<typeof vi.fn>).mockReturnValue(mockLink);

      service.setCanonicalURL('/about');

      const call = (mockLink.setAttribute as ReturnType<typeof vi.fn>).mock.calls.find(
        (c: string[]) => c[0] === 'href',
      );
      expect(call?.[1]).not.toContain('//about');
    });

    it('falls back to document.URL when no slug provided', () => {
      const mockLink = { setAttribute: vi.fn() };
      (mockDocument.querySelector as ReturnType<typeof vi.fn>).mockReturnValue(mockLink);

      service.setCanonicalURL();

      expect(mockLink.setAttribute).toHaveBeenCalledWith('href', mockDocument.URL);
    });
  });
});
