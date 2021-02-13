import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconServiceInterface } from '@core/interfaces/icon-service.interface';

@Injectable()
export class IconServerService implements IconServiceInterface {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
  }

  addSvgIcon(icon: string): void {
    // dependency issue: 1
    this.matIconRegistry.addSvgIconLiteral(
      icon,
      this.domSanitizer.bypassSecurityTrustHtml('<svg></svg>'),
    );
  }
}
