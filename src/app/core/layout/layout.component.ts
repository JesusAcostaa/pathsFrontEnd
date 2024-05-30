import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from './components/menu/menu.component';
import { AuthService, LoaderService } from '../services';
import { AsyncPipe } from '@angular/common';
import { delay } from 'rxjs';

const DELAY_LOGOUT_TIME = 1000;

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
  private loaderService = inject(LoaderService);

  public logout() {
    this.loaderService.show();
    this.authService
      .logout()
      .pipe(delay(DELAY_LOGOUT_TIME))
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.loaderService.hide();
          sessionStorage.clear();
        },
      });
  }

  get currentUser() {
    return this.authService.currentUser;
  }
}
