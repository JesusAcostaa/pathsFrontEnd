import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LayoutComponent } from './core/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { firebaseProviders } from './firebase.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environments';
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getFunctions, provideFunctions } from "@angular/fire/functions";
import { getStorage, provideStorage } from "@angular/fire/storage";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    LoginComponent,
    LayoutComponent,
    NotFoundComponent,
    BrowserAnimationsModule,
    ToastModule,
    LoginComponent,
    LoaderComponent,
  ],
  providers: [
    MessageService,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
