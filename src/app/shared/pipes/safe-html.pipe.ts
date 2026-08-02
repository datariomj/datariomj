import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | SafeHtml | null | undefined): SafeHtml | null {
    if (!value) {
      return null;
    }

    if (typeof value === 'string') {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }

    return value;
  }
}
