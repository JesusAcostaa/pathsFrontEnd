import { Component, input, output } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { AsyncPipe, JsonPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { UserInformation } from '../../../interfaces/user.interface';
import { FormatNamePipe } from "./format-name.pipe";

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
export class MenuComponent {
  public onLogout = output<void>();
  public user = input<UserInformation>();

  public items: MenuItem[] = [
    {
      separator: true,
    },
    {
      label: 'Gestión',
      items: [
        {
          label: 'Profesores',
          icon: 'pi pi-address-book',
          routerLink: '/inicio',
        },
        {
          label: 'Estudiantes',
          icon: 'pi pi-users',
          routerLink: '/inicio/gestion-estudiantes',
        },
      ],
    },
    {
      label: 'Actividades',
      items: [
        {
          label: 'Rutas',
          icon: 'pi pi-sparkles',
          routerLink: '/inicio/rutas-aprendizaje',
        },
        {
          label: 'Recursos',
          icon: 'pi pi-inbox',
          routerLink: '/inicio/gestion-recursos',
        },
        {
          separator: true,
        },
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-sign-out',
          command: () => this.onLogout.emit(),
        },
      ],
    },
    {
      separator: true,
    },
  ];
}
