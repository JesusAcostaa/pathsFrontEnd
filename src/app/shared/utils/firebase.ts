import { QuerySnapshot } from '@firebase/firestore';
import {
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { getDoc } from '@angular/fire/firestore';

export class FirebaseUtils {
  static getDataFromQuery(
    data: QuerySnapshot<DocumentData, DocumentData>
  ): any[] {
    return data.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
  }

  static async getDataFromReference(ref: DocumentReference): Promise<any> {
    const snapshot = await getDoc(ref);
    return snapshot.data();
  }
}
