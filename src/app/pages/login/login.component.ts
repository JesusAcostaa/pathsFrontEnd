import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isSignDivVisible: boolean = true;
  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  users: SignUpModel[] = [
    { email: 'joacostaa@ufpso.edu.co', password: 'Jesus09acosta' },
    { email: 'alice@example.com', password: 'password2' },
  ];

  constructor(private router: Router) {}

  onRegister() {
    const isUserPresent = this.users.find(
      user =>
        user.email === this.signUpObj.email &&
        user.password === this.signUpObj.password
    );
    if (isUserPresent) {
      this.router.navigateByUrl('/dashboard');
    } else {
      alert('Usuario no encotrado');
    }
  }

  onLogin() {
    this.router.navigateByUrl('/dashboard');
  }
}

export class SignUpModel {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
