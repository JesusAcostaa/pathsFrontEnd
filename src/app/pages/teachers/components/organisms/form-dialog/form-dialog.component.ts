import {
  Component,
  inject,
  input,
  OnChanges,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
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
import { CommonModule } from '@angular/common';

import {
  FormDialogParams,
  UserInformation,
  UserRoles,
} from '../../../../../core/interfaces';
import { ProfilePictureComponent } from '../../molecules/profile-picture/profile-picture.component';
import { userEmailValidator } from '../../../../../shared/utils';
import { TeachersService } from '../../../../../core/services';

const DEFAULT_IMAGE =
  'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.967060102.1715817600&semt=ais_user';

@Component({
  standalone: true,
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  imports: [
    CommonModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    ProfilePictureComponent,
  ],
  styleUrl: './form-dialog.component.css',
})
export class FormDialogComponent implements OnChanges, OnDestroy {
  public onClose = output<void>();
  public onSave = output<FormDialogParams>();

  public isVisible = input(false);
  public teacher = input<UserInformation>();

  private selectedFile = signal<File | null>(null);
  private readonly teacherService = inject(TeachersService);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: userEmailValidator(this.teacherService),
    }),
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
    const user = this.form.getRawValue() as UserInformation;
    const file = this.selectedFile() || new File([], '');
    this.onSave.emit({
      user,
      file,
    });
  }

  public resetForm() {
    this.form.patchValue({
      name: '',
      email: '',
      photoURL: DEFAULT_IMAGE,
      role: UserRoles.Teacher,
      id: '',
    });
  }

  public handleSelectedPicture(file: File) {
    this.selectedFile.set(file);
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

  get isEmailAvailable() {
    return this.email.hasError('emailTaken') && this.email.touched;
  }

  private isRequired(control: FormControl) {
    return control.hasError('required') && control.touched;
  }

  ngOnDestroy() {
    this.selectedFile.set(new File([], ''));
  }
}
