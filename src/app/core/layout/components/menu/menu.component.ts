import { AfterViewInit, Component, input, OnInit, output } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { AsyncPipe, JsonPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LearningRoutes, UserInformation } from '../../../interfaces';
import { FormatNamePipe } from './format-name.pipe';
import { routeByLearningPath } from '../../../../shared/utils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  standalone: true,
  imports: [
    MenuModule,
    BadgeModule,
    AvatarModule,
    RippleModule,
    NgIf,
    StyleClassModule,
    NgOptimizedImage,
    JsonPipe,
    AsyncPipe,
    FormatNamePipe,
  ],
})
export class MenuComponent implements OnInit, AfterViewInit {
  public onLogout = output<void>();
  public user = input<UserInformation | null>();

  public menu: MenuItem[] = [];

  ngOnInit() {
    const logOutItem = {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.onLogout.emit(),
    };

    this.menu = this.user()?.menu ?? [];
    this.menu
      .find(item => item.label === 'Actividades')
      ?.items?.push(logOutItem);
  }

  ngAfterViewInit() {
    const learningPath = this.user()?.learningPath;
    const route = routeByLearningPath[learningPath ?? LearningRoutes.Mixed];
    const element = this.menu.find(({ label }) => label === 'Actividades');

    if (element) {
      const item = element.items?.find(({ label }) => label === 'Rutas');
      if (item) item.routerLink = route;
    }
  }
}
