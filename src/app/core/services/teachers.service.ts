import { inject, Injectable, signal } from '@angular/core';
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
import { UserInformation } from '../interfaces';
import { firstValueFrom, Observable } from 'rxjs';

const PATH = 'teachers';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  public teachers = signal<UserInformation[]>([]);

  async isEmailAvailable(email: string): Promise<boolean> {
    const querySnapshot = await getDocs(
      query(this._collection, where('email', '==', email))
    );

    return querySnapshot.empty;
  }

  public async getAll() {
    const collection = collectionData(this._collection, {
      idField: 'id',
    }) as Observable<UserInformation[]>;

    this.teachers.set(await firstValueFrom(collection));
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
    await addDoc(this._collection, { ...teacher });
    this.teachers.update(teachers => teachers.concat(teacher));
  }

  async update(teacher: UserInformation) {
    await updateDoc(this.document(teacher.id), { ...teacher });

    const index = this.teachers().findIndex(t => t.id === teacher.id);
    this.teachers.update(teachers => {
      teachers[index] = teacher;
      return teachers;
    });
  }

  async delete(id: string) {
    this.teachers.update(teachers => teachers.filter(t => t.id !== id));
    return deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }
}
