import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-experience-block',
  templateUrl: './experience-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./experience-block.component.css'],
  imports: [NgClass],
})
export class ExperienceBlockComponent {
  @Input() title = '';
  @Input() company = '';
  @Input() dateRange = '';
  @Input() location = '';
  @Input() badge = '';
  @Input() isCurrent = false;
  @Input() items: string[] = [];
  @Input() technologies: string[] = [];
}
