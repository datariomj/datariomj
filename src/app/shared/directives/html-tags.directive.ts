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
    const postElementAnchor = this.renderer.nextSibling(this.elementRef.nativeElement);
    const preTagElement = this.renderer.createElement('div');
    const postTagElement = this.renderer.createElement('div');

    this.renderer.setProperty(preTagElement, 'innerHTML', this.getTag(nodeName, true));
    this.renderer.setProperty(postTagElement, 'innerHTML', this.getTag(nodeName, false));

    this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, preTagElement, this.elementRef.nativeElement);
    this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, postTagElement, postElementAnchor);
  }

  private getTag(nodeName: string, initial: boolean): string {
    // eslint-disable-next-line max-len
    return `<span class="html-tag">&lt;${ initial ? '' : '/' }</span><span class="html-tag html-tag__node">${ nodeName }</span><span class="html-tag">&gt;</span>`;
  }
};
