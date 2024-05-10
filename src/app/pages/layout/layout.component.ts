import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [ButtonModule],
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    switch (route) {
      case 'home':
        this.router.navigateByUrl('/home');
        break;
      case 'students':
        this.router.navigateByUrl('/students');
        break;
      case 'statistics':
        this.router.navigateByUrl('/statistics');
        break;
      default:
        break;
    }
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}
