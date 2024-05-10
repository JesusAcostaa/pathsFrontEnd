import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from './components/menu/menu.component';
import { AuthService } from '../services/auth.service';
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [ButtonModule, MenuComponent, RouterOutlet, RouterModule, AsyncPipe],
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  get currentUser() {
    return this.authService.currentUser;
  }
}
