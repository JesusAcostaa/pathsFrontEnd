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
import { FirebaseModule } from './firebase.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoaderComponent } from "./shared/components/loader/loader.component";

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
    FirebaseModule,
    ToastModule,
    LoginComponent,
    LoaderComponent,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
