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
import { LearningRoutes, UserInformation } from '../interfaces';
import { FirebaseUtils } from '../../shared/utils';
import { SurveyResult } from '../../pages/learning-style-survey/interfaces';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, of } from 'rxjs';

const PATH = 'users';
const MENU_PATH = 'roles/3tZm2tg3aH9CjvaS19d3';

interface LearningStyleResponse {
  learningPath: 'VISUAL' | 'AUDITORY' | 'KINESTHETIC' | 'Unknown';
  status: number;
}

export interface LearningStyle {
  learningPath: LearningRoutes;
  status: number;
}

const mapLearningStyle = {
  VISUAL: LearningRoutes.Visual,
  AUDITORY: LearningRoutes.Auditory,
  KINESTHETIC: LearningRoutes.Kinesthetic,
  Unknown: LearningRoutes.Mixed,
};

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  private httpClient = inject(HttpClient);

  public students = signal<UserInformation[]>([]);

  public async getAll() {
    const querySnapshot = await getDocs(
      query(this._collection, where('role', '==', 'STUDENT'))
    );

    const students = FirebaseUtils.getDataFromQuery(querySnapshot);
    this.students.set(students);
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
      learningPath: null,
      menu: this.menuRef(),
    });

    this.students.update(students =>
      students.concat({ ...student, id: doc.id })
    );
  }

  async update(student: UserInformation) {
    await updateDoc(this.document(student.id), { ...student });

    const index = this.students().findIndex(t => t.id === student.id);
    this.students.update(currentStudent => {
      currentStudent[index] = student;
      return currentStudent;
    });
  }

  async getLearningStyle(surveyResult: SurveyResult[]): Promise<LearningStyle> {
    const mockResponse: LearningStyleResponse[] = [
      { learningPath: 'VISUAL', status: 200 },
      { learningPath: 'AUDITORY', status: 200 },
      { learningPath: 'KINESTHETIC', status: 200 },
      { learningPath: 'Unknown', status: 200 },
    ];

    const response = of(
      mockResponse[Math.floor(Math.random() * mockResponse.length)]
    ).pipe(
      map(response => {
        return {
          ...response,
          learningPath: mapLearningStyle[response.learningPath],
        };
      })
    );

    return lastValueFrom(response);
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
