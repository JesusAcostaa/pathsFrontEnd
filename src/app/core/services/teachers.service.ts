import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { FirebaseUtils } from '../../shared/utils';
import { UserInformation } from '../interfaces';
import { lastValueFrom, Observable } from 'rxjs';

const PATH = 'teachers';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  async getByEmail(id: string) {
    const snapshot = await getDoc(this.document(id));
    return snapshot.data() as UserInformation;
  }

  public getAll() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      UserInformation[]
    >;
  }

  async searchByQuery(name: string) {
    const querySnapshot = await getDocs(
      query(
        this._collection,
        where('name', '>=', name),
        where('name', '<=', name + '\uf8ff')
      )
    );

    return querySnapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as UserInformation
    );
  }

  async add(teacher: UserInformation) {
    return await addDoc(this._collection, teacher);
  }

  async update(teacher: UserInformation) {
    return updateDoc(this.document(teacher.id), { ...teacher });
  }

  async delete(id: string) {
    return deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }
}
