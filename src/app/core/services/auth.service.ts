import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { UserInformation } from '../interfaces';
import { UserService } from './user.service';

const USER_ALREADY_EXISTS = 'auth/email-already-in-use';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _firebaseAuth = inject(Auth);
  private _userService = inject(UserService);

  public currentUser = signal<UserInformation | null>(null);

  public async login(email = '', password = '') {
    try {
      await signInWithEmailAndPassword(this._firebaseAuth, email, password);
      const user = await this._userService.getUserByEmail(email);
      this.updateCurrentUser(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async createUser(email: string) {
    try {
      await createUserWithEmailAndPassword(
        this._firebaseAuth,
        email,
        this.getRandomPassword()
      );
      await this.sendResetPasswordEmail(email);
    } catch (error: any) {
      if (error.code === USER_ALREADY_EXISTS) {
        return this.sendResetPasswordEmail(email);
      }
    }
  }

  private async sendResetPasswordEmail(email: string) {
    return await sendPasswordResetEmail(this._firebaseAuth, email);
  }

  private getRandomPassword() {
    return Math.random().toString(36).slice(-8);
  }

  updateCurrentUser(user: UserInformation) {
    this.currentUser.set(user);
  }

  public logout() {
    return from(signOut(this._firebaseAuth));
  }

  public isLogged() {
    return of(this.currentUser() !== null);
  }
}
