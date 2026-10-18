import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

import { ProjectItem } from '../../interfaces/project-item';

@Component({
  selector: 'app-project-card',
  standalone: true,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  project = input.required<ProjectItem>();
}
