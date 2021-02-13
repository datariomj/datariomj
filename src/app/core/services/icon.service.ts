import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconServiceInterface } from '@core/interfaces/icon-service.interface';

@Injectable()
export class IconService implements IconServiceInterface {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
  }

  addSvgIcon(icon: string): void {
    this.matIconRegistry.addSvgIcon(
      icon,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/svg/${ icon }.svg`),
    );
  }
}
