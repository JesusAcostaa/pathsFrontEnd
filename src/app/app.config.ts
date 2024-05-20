import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { provideAnimations } from '@angular/platform-browser/animations';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

import { ConfirmationService, MessageService } from 'primeng/api';

import { routes } from './app-routes';
import { environment } from '../environments/environments';

export const appConfig: ApplicationConfig = {
  providers: [
    ConfirmationService,
    MessageService,
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
};
