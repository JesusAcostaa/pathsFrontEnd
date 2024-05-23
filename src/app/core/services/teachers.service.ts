import { inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { UserInformation } from '../interfaces';
import { FirebaseUtils } from '../../shared/utils';

const PATH = 'users';
const MENU_PATH = 'roles/Ilyb4OUDgfzUmREuIR9t';

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
    const querySnapshot = await getDocs(
      query(this._collection, where('role', '==', 'TEACHER'))
    );

    const teachers = FirebaseUtils.getDataFromQuery(querySnapshot);
    this.teachers.set(teachers);
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

  async add({ email, name, role, photoURL }: UserInformation) {
    const teacher = {
      email,
      name,
      role,
      photoURL,
    };

    const doc = await addDoc(this._collection, {
      ...teacher,
      menu: this.menuRef(),
    });

    this.teachers.update(teachers =>
      teachers.concat({ ...teacher, id: doc.id })
    );
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
    await deleteDoc(this.document(id));
    this.teachers.update(teachers => teachers.filter(t => t.id !== id));
  }

  private menuRef() {
    return doc(this._firestore, MENU_PATH);
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }
}
