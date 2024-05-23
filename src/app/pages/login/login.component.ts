import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, ToastService, LoaderService } from '../../core/services';
import { ButtonModule } from 'primeng/button';
import { UserRoles } from '../../core/interfaces';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

const DELAY_LOGIN_TIME = 3000;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, NgClass, NgIf],
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

  private routesByRole: Record<string, string> = {
    [UserRoles.Admin]: '/inicio',
    [UserRoles.Teacher]: '/inicio/gestion-estudiantes',
    [UserRoles.Student]: '/inicio/rutas-aprendizaje',
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
      .then(() => {
        const role = this.authService.currentUser()?.role;

        if (role) {
          const route = this.routesByRole[role];
          this.router.navigateByUrl(route);
        }
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
