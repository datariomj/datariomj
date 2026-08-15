import { ChangeDetectionStrategy,Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-terminal-button',
    templateUrl: './terminal-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./terminal-button.component.css'],
    standalone: true,
})
export class TerminalButtonComponent {
  @Input() label = '';
  @Input() variant: 'primary' | 'ghost' = 'primary';
  @Output() buttonClick = new EventEmitter<Event>();

  onClick(event: Event) {
    this.buttonClick.emit(event);
  }
}
