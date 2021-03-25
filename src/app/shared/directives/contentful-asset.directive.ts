import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ContentfulService } from '@core/services/contentful.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appContentfulAsset]',
})
export class ContentfulAssetDirective implements OnInit, OnDestroy {
  @Input() appContentfulAsset!: string;
  @Input() assetWidth!: number;
  @Input() assetHeight!: number;
  private $unsubsriber = new Subject<any>();

  constructor(
    private el: ElementRef,
    private cms: ContentfulService,
  ) {
  }

  ngOnInit() {
    if (this.appContentfulAsset) {
      this.cms.getFileUrlByAssetById(this.appContentfulAsset).pipe(
        takeUntil(this.$unsubsriber),
      ).subscribe((fileUrl) => {
        if (this.assetWidth && this.assetHeight) {
          fileUrl = `${ fileUrl }?w=${ this.assetWidth }&h=${ this.assetHeight }`;
        }

        this.el.nativeElement.src = fileUrl;
      });
    }
  }

  ngOnDestroy() {
    this.$unsubsriber.next();
    this.$unsubsriber.complete();
  }
};
