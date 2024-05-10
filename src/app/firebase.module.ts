import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  imports: [
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'paths-storage',
        appId: '1:509557320033:web:9858722cd9e0c94a087d20',
        storageBucket: 'paths-storage.appspot.com',
        apiKey: 'AIzaSyCX2PpTAYi3Yj7kwrBUZwITw3AnhGOAGEk',
        authDomain: 'paths-storage.firebaseapp.com',
        messagingSenderId: '509557320033',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
  ],
})
export class FirebaseModule {}
