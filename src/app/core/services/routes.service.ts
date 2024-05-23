import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  arrayUnion,
  collection,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { LearningRoutes } from '../interfaces';
import { DocumentReference } from '@angular/fire/compat/firestore';

const PATH = 'routes';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  public async send(route: LearningRoutes, resourceUrl: string) {
    const ref = await this.getRouteByType(route);

    if (ref) {
      await this.update(ref, resourceUrl);
      return;
    }

    await addDoc(this._collection, {
      type: route,
      resources: [resourceUrl],
    });
  }

  public async update(ref: DocumentReference, resourceUrl: string) {
    await updateDoc(ref, {
      resources: arrayUnion(resourceUrl),
    });
  }

  async getRouteByType(route: LearningRoutes) {
    const data = await getDocs(
      query(this._collection, where('type', '==', route))
    );
    return data.docs[0]?.ref as unknown as DocumentReference;
  }
}
