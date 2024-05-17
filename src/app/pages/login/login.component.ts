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
import { AuthService, ToastService, LoaderService } from '../../core/services';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

const DELAY_LOGIN_TIME = 3000;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule],
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private loaderService = inject(LoaderService);

  isSignDivVisible: boolean = true;
  loginForm!: FormGroup<LoginForm>;

  private typeLoginErrors: Record<string, string> = {
    'auth/invalid-email': 'Correo o contraseña inválidos',
    'auth/invalid-credential': 'Correo o contraseña inválidos',
  };

  ngOnInit() {
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

  public handleLogin() {
    const { email, password } = this.loginForm.value;

    this.loaderService.show();
    this.authService
      .login(email, password)
      .then(data => {
        console.log(data);
        this.router.navigateByUrl('/inicio');
      })
      .catch(error => {
        this.handleLoginError(error.code);
      })
      .finally(() => {
        this.loaderService.hide();
      });
  }

  private handleLoginError(code: string) {
    this.toastService.showError(this.typeLoginErrors[code]);
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
