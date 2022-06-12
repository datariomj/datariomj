import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ContactFormVisibility } from '@store/ui/ui.action';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDialogComponent {
  contactForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
    ]),
    email: new UntypedFormControl('', [
      Validators.required,
      // eslint-disable-next-line max-len
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    ]),
    message: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
  });

  constructor(
    private store: Store,
  ) {
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    this.closeDialog();
  }

  closeDialog() {
    this.store.dispatch(new ContactFormVisibility(false));
  }
}
