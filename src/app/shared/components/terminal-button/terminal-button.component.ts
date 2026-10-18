import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'app-terminal-button',
    templateUrl: './terminal-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./terminal-button.component.css'],
    standalone: true,
})
export class TerminalButtonComponent {
  label = input<string>('');
  variant = input<'primary' | 'ghost'>('primary');
  buttonClick = output<Event>();

  onClick(event: Event) {
    this.buttonClick.emit(event);
  }
}
