import { TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { describe, expect, it, beforeEach } from 'vitest';

import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafeHtmlPipe],
    });

    pipe = TestBed.inject(SafeHtmlPipe);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null for null', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('should return null for undefined', () => {
    expect(pipe.transform(undefined)).toBeNull();
  });

  it('should return null for empty string', () => {
    expect(pipe.transform('')).toBeNull();
  });

  it('should bypass security for a string value', () => {
    const html = '<span class="test">hello</span>';
    const result = pipe.transform(html);

    expect(result).toBeTruthy();
    expect(sanitizer.sanitize(1, result)).toBe(html);
  });

  it('should return a SafeHtml value as-is', () => {
    const safeHtml = sanitizer.bypassSecurityTrustHtml('<p>safe</p>');
    const result = pipe.transform(safeHtml);

    expect(result).toBe(safeHtml);
  });
});
