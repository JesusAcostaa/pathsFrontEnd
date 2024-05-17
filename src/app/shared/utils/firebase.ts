import { QuerySnapshot } from '@firebase/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';

export class FirebaseUtils {
  static getDataFromQuery(data: QuerySnapshot<DocumentData, DocumentData>): any[] {
    return data.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
  }
}
