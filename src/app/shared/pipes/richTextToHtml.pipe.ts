import { Pipe, PipeTransform } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';

@Pipe({
  name: 'richTextToHtml',
})
export class RichTextToHtmlPipe implements PipeTransform {

  transform(value: Document): string {
    if (value) {
      return documentToHtmlString(value);
    }

    return '';
  }
}
