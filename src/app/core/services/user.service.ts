import { lastValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { UserForm, UserInformation } from '../interfaces';
import { FirebaseUtils } from '../../shared/utils';

const PATH = 'users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  async getUserByEmail(email: string): Promise<UserInformation> {
    const data = await getDocs(
      query(this._collection, where('email', '==', email))
    );
    return FirebaseUtils.getDataFromQuery(data).at(0) as UserInformation;
  }

  async getAll() {
    return await lastValueFrom(collectionData(this._collection));
  }
}
