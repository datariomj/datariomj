import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TerminalHeroComponent } from '../shared/components/terminal-hero/terminal-hero.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.html',
    styleUrl: './about.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TerminalHeroComponent, NgOptimizedImage],
})
export class About {

}
