import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy,Component, Input } from '@angular/core';

export interface SkillCategory {
  category: string;
  items: string[];
}

@Component({
    selector: 'app-skills-matrix',
    templateUrl: './skills-matrix.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./skills-matrix.component.css'],
    imports: [UpperCasePipe],
})
export class SkillsMatrixComponent {
  @Input() categories: SkillCategory[] = [];
}
