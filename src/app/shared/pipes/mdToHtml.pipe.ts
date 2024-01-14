import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'mdToHtml',
})
export class MdToHtmlPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (value) {
      return marked(value) as string;
    }

    return '';
  }
}

// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
