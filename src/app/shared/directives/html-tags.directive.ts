import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHtmlTags]',
})
export class HtmlTagsDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit() {
    const nodeName = this.elementRef.nativeElement.nodeName.toLowerCase();
    const currentText = this.elementRef.nativeElement.innerText;

    const newHtml = `
      ${ this.getTag(nodeName, true) }
      <span class="html-tag__text">&nbsp;&nbsp;&nbsp;&nbsp;${ currentText }</span>
      ${ this.getTag(nodeName, false) }
    `;

    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', newHtml);
  }

  private getTag(nodeName: string, initial: boolean): string {
    // eslint-disable-next-line max-len
    return `<span class="html-tag">&lt;${ initial ? '' : '/' }</span><span class="html-tag html-tag__node">${ nodeName }</span><span class="html-tag">&gt;</span>`;
  }
};
