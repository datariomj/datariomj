import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';

export interface ExperienceMetric {
  label: string;
  value: string;
}

@Component({
  selector: 'app-experience-block',
  templateUrl: './experience-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./experience-block.component.css'],
  imports: [NgClass],
})
export class ExperienceBlockComponent {
  private cdr = inject(ChangeDetectorRef);

  @Input() title = '';
  @Input() company = '';
  @Input() dateRange = '';
  @Input() location = '';
  @Input() badge = '';
  @Input() isCurrent = false;
  @Input() items: string[] = [];
  @Input() technologies: string[] = [];
  @Input() metrics: ExperienceMetric[] = [];

  showMetrics = false;

  toggleMetrics(): void {
    this.showMetrics = !this.showMetrics;
    this.cdr.markForCheck();
  }
}
