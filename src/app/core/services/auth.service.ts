import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { UserInformation } from '../interfaces';
import { UserService } from './user.service';
import { Menu } from 'primeng/menu';

const DELAY_LOGIN_TIME = 1000;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _firebaseAuth = inject(Auth);
  private _userService = inject(UserService);

  private user$ = user(this._firebaseAuth);
  public currentUser = signal<UserInformation | null>(null);

  public async login(email = '', password = '') {
    try {
      await signInWithEmailAndPassword(this._firebaseAuth, email, password);
      const user = await this._userService.getUserByEmail(email);
      console.log(user)
      this.updateCurrentUser(user);
    } catch (error) {
      console.log(error)
      return Promise.reject(error);
    }
  }

  private updateCurrentUser(user: UserInformation) {
    this.currentUser.set(user);
  }

  public logout() {
    return from(signOut(this._firebaseAuth));
  }

  public isLogged() {
    return of(this.currentUser() !== null);
  }
}
