import { Component, Input, input, OnChanges, OnInit, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { JsonPipe, NgIf, NgOptimizedImage } from '@angular/common';

import { UserInformation, UserRoles } from '../../../../../core/interfaces';

const DEFAULT_IMAGE =
  'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.967060102.1715817600&semt=ais_user';

@Component({
  standalone: true,
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  imports: [
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    NgIf,
    ReactiveFormsModule,
    JsonPipe,
    NgOptimizedImage,
  ],
  styleUrl: './form-dialog.component.css',
})
export class FormDialogComponent implements OnChanges {
  public onSave = output<UserInformation>();
  public onClose = output<void>();

  public isVisible = input(false);
  public teacher = input<UserInformation>();

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    photoURL: new FormControl({ value: DEFAULT_IMAGE, disabled: false }, [
      Validators.required,
    ]),
    role: new FormControl({ value: UserRoles.Teacher, disabled: true }),
    id: new FormControl(''),
  });

  ngOnChanges() {
    if (this.teacher()) {
      this.form.patchValue(this.teacher() as Partial<UserInformation>);
    }
  }

  public handleSave() {
    this.onSave.emit(this.form.getRawValue() as UserInformation);
  }

  public resetForm() {
    console.log('reset')
    this.form.patchValue({
      name: '',
      email: '',
      photoURL: DEFAULT_IMAGE,
      role: UserRoles.Teacher,
      id: '',
    })
  }

  get name() {
    return this.form.controls.name;
  }

  get email() {
    return this.form.controls.email;
  }

  get isRequiredName() {
    return this.isRequired(this.name);
  }

  get isRequiredEmail() {
    return this.isRequired(this.email);
  }

  get isInvalidEmail() {
    return this.email.hasError('email') && this.email.touched;
  }

  private isRequired(control: FormControl) {
    return control.hasError('required') && control.touched;
  }
}
