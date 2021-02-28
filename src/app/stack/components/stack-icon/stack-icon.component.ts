import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-stack-icon',
  templateUrl: './stack-icon.component.html',
  styleUrls: ['./stack-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackIconComponent {
  @Input() icon!: string;
  numbers = Array.from({ length: 13 }, (_, i) => i + 1);
}
