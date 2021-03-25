import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'mdToHtml',
})
export class MdToHtmlPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (value) {
      return marked(value);
    }

    return '';
  }
}

// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
