import { Component, input, OnInit, output } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { AsyncPipe, JsonPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { UserInformation } from '../../../interfaces';
import { FormatNamePipe } from './format-name.pipe';

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
export class MenuComponent implements OnInit {
  public onLogout = output<void>();
  public user = input<UserInformation | null>();

  public items: MenuItem[] = [];

  ngOnInit() {
    const logOutItem = {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.onLogout.emit(),
    };

    this.items = this.user()?.menu ?? [];
    this.items
      .find(item => item.label === 'Actividades')
      ?.items?.push(logOutItem);
  }
}
