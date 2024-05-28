import { Component, inject, OnInit } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { NotFoundComponent, LoaderComponent } from './shared/components';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FileService } from "./core/services/file.service";
import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    LoginComponent,
    LayoutComponent,
    NotFoundComponent,
    ToastModule,
    LoginComponent,
    LoaderComponent,
    RouterOutlet,
  ],
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, 'users');
  private httpClient = inject(HttpClient);

  private fileService = inject(FileService);
  primeConfig = inject(PrimeNGConfig)

  async ngOnInit() {
    this.primeConfig.ripple = true;
    //console.log(await this.fileService.getAllImages());
    const menu = {
      menu: 'roles/3tZm2tg3aH9CjvaS19d3',
      photoURL:
        'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.967060102.1715817600&semt=ais_user',
      name: 'Dacortesn',
      role: 'STUDENT',
      email: 'dacortesn@ufpso.edu.co',
    };

    //addDoc(this._collection, menu).then(r => {
    //  console.log('Document written with ID: ', r.id);
    //});
  }
}
