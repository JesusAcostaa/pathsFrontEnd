import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { delay, from } from 'rxjs';
import { UserInformation } from '../interfaces/user.interface';

const DELAY_LOGIN_TIME = 2000;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);

  public user$ = user(this.firebaseAuth);
  public currentUser = signal<UserInformation | null | undefined>(undefined);

  public login(email = '', password = '') {
    try {
      return from(
        signInWithEmailAndPassword(this.firebaseAuth, email, password)
      ).pipe(delay(DELAY_LOGIN_TIME));
    } catch (error) {
      return from(Promise.reject(error));
    }
  }

  public logout() {
    return from(signOut(this.firebaseAuth));
  }

  public isLogged() {
    return this.currentUser() !== null;
  }
}
