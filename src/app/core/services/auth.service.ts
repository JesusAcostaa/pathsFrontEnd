import { inject, Injectable, signal } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { from, Observable } from 'rxjs';
import { UserInformation } from '../interfaces/user.interface';
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _afAuth = inject(AngularFireAuth);
  private _userService = inject(UserService);

  public currentUser = signal<UserInformation>(null);

  public async register() {
    const { user } = await this.googleAuth();
    await this.registerUser(user);

    this.updateUser(user);
  }

  private async googleAuth(): Promise<firebase.auth.UserCredential> {
    return await this._afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  private async registerUser(user: UserInformation) {
    await this._userService.validate(user);
  }

  private updateUser(user: UserInformation) {
    this.currentUser.set(user);
  }

  public isLogged() {
    return from(this._afAuth.currentUser);
  }

  public logout(): Observable<void> {
    return from(this._afAuth.signOut());
  }
}
