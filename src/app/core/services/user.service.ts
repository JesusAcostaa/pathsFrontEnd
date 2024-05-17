import { lastValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { UserInformation } from '../interfaces';

const PATH = 'users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  public async validate(teacher: UserInformation) {
    const user = await this.getUserByEmail(teacher?.email ?? '');
    const isAExistingUser = !user.empty;

    if (!isAExistingUser) {
      return Promise.reject('Correo o contraseña inválidos');
    }

    return Promise.resolve();
  }

  async getUserByEmail(email: string) {
    return await getDocs(query(this._collection, where('uid', '==', email)));
  }

  async getAll() {
    return lastValueFrom(collectionData(this._collection));
  }
}
