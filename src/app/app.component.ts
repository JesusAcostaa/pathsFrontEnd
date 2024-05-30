import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { LoaderComponent, NotFoundComponent } from './shared/components';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';

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
  private primeConfig = inject(PrimeNGConfig);

  async ngOnInit() {
    this.primeConfig.ripple = true;
  }
}
