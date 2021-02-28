import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactDialogComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      // eslint-disable-next-line max-len
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
  });

  constructor(
    private dialogRef: MatDialogRef<ContactDialogComponent>,
  ) {
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    this.dialogRef.close(this.contactForm.value);
  }
}
