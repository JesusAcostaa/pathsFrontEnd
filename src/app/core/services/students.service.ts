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
import { FirebaseUtils } from '../../shared/utils';

const PATH = 'users';
const MENU_PATH = 'roles/3tZm2tg3aH9CjvaS19d3';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  public students = signal<UserInformation[]>([]);

  async isEmailAvailable(email: string): Promise<boolean> {
    const querySnapshot = await getDocs(
      query(this._collection, where('email', '==', email))
    );

    return querySnapshot.empty;
  }

  public async getAll() {
    const querySnapshot = await getDocs(
      query(this._collection, where('role', '==', 'STUDENT'))
    );

    const students = FirebaseUtils.getDataFromQuery(querySnapshot);
    this.students.set(students);
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
    const student = {
      email,
      name,
      role,
      photoURL,
    };

    const doc = await addDoc(this._collection, {
      ...student,
      menu: this.menuRef(),
    });

    this.students.update(students =>
      students.concat({ ...student, id: doc.id })
    );
  }

  async update(teacher: UserInformation) {
    await updateDoc(this.document(teacher.id), { ...teacher });

    const index = this.students().findIndex(t => t.id === teacher.id);
    this.students.update(teachers => {
      teachers[index] = teacher;
      return teachers;
    });
  }

  async delete(id: string) {
    await deleteDoc(this.document(id));
    this.students.update(teachers => teachers.filter(t => t.id !== id));
  }

  private menuRef() {
    return doc(this._firestore, MENU_PATH);
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }
}
