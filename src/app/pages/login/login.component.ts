import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { ButtonModule } from 'primeng/button';
import { LoaderService } from '../../core/services/loader.service';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule],
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _toastService = inject(ToastService);
  private _loaderService = inject(LoaderService);

  public isSignDivVisible: boolean = true;
  public loginForm!: FormGroup<LoginForm>;

  private typeLoginErrors: Record<string, string> = {
    'auth/invalid-email': 'Correo o contraseña inválidos',
    'auth/invalid-credential': 'Correo o contraseña inválidos',
  };

  ngOnInit() {
    this._authService.logout();

    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.minLength(6), Validators.required],
      }),
    });
  }

  public async signIn() {
    this._loaderService.show();
    this._authService.register().then(() => {
      this._loaderService.hide();
      this._router.navigate(['/inicio']);
    });
  }

  private handleLoginError(code: string) {
    this._toastService.showError(this.typeLoginErrors[code]);
  }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  get isRequiredEmail() {
    return this.email.hasError('required') && this.email.touched;
  }

  get isInvalidEmail() {
    return this.email.hasError('email') && this.email.touched;
  }

  get isRequiredPassword() {
    return this.password.hasError('required') && this.password.touched;
  }

  get isInvalidLengthPassword() {
    return this.password.hasError('minlength') && this.password.touched;
  }
}
