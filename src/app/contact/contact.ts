import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TerminalHeroComponent } from '../shared/components/terminal-hero/terminal-hero.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TerminalHeroComponent],
})
export class Contact {
  private cdr = inject(ChangeDetectorRef);

  name = '';
  email = '';
  message = '';

  nameTouched = false;
  emailTouched = false;
  messageTouched = false;

  isSubmitting = false;
  isSubmitted = false;

  get isNameValid(): boolean {
    return this.name.trim().length >= 2;
  }

  get isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email.trim());
  }

  get isMessageValid(): boolean {
    return this.message.trim().length >= 10;
  }

  get isFormValid(): boolean {
    return this.isNameValid && this.isEmailValid && this.isMessageValid;
  }

  onFocus(event: Event) {
    const input = event.target as HTMLElement;
    const label = input.parentElement?.querySelector('label');
    if (label) {
      label.classList.add('label-focused');
    }
  }

  onBlur(field: 'name' | 'email' | 'message', event: Event) {
    const input = event.target as HTMLElement;
    const label = input.parentElement?.querySelector('label');
    if (label) {
      label.classList.remove('label-focused');
    }

    if (field === 'name') this.nameTouched = true;
    if (field === 'email') this.emailTouched = true;
    if (field === 'message') this.messageTouched = true;
    this.cdr.markForCheck();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.nameTouched = true;
    this.emailTouched = true;
    this.messageTouched = true;

    if (!this.isFormValid) {
      this.cdr.markForCheck();
      return;
    }

    this.isSubmitting = true;
    this.cdr.markForCheck();

    // Simulate transmission
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
      this.cdr.markForCheck();
    }, 1200);
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.message = '';
    this.nameTouched = false;
    this.emailTouched = false;
    this.messageTouched = false;
    this.isSubmitting = false;
    this.isSubmitted = false;
    this.cdr.markForCheck();
  }
}
