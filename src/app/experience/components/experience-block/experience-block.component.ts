import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-experience-block',
  templateUrl: './experience-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./experience-block.component.css'],
  imports: [NgClass],
})
export class ExperienceBlockComponent {
  title = input<string>('');
  company = input<string>('');
  dateRange = input<string>('');
  location = input<string>('');
  badge = input<string>('');
  isCurrent = input<boolean>(false);
  items = input<string[]>([]);
  technologies = input<string[]>([]);
}
