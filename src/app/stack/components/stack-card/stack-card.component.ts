import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { StackItem } from '@stack/interfaces/stack-item';

@Component({
  selector: 'app-stack-card',
  templateUrl: './stack-card.component.html',
  styleUrls: ['./stack-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackCardComponent {
  @Input() stackData!: StackItem;
}
