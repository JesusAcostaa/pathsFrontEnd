import { Component, signal } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  MemoryCardGameComponent,
  PuzzleGameComponent,
} from '../../components/organisms';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-visual-games',
  standalone: true,
  imports: [
    TabViewModule,
    NgForOf,
    RouterOutlet,
    RouterLink,
    MemoryCardGameComponent,
    TabMenuModule,
    NgIf,
    PuzzleGameComponent,
  ],
  templateUrl: './visual-games.component.html',
  styleUrl: './visual-games.component.css',
})
export class VisualGamesComponent {
  public showMemoryGame = signal(true);

  public hideMemoryGame() {
    console.log('hideMemoryGame')
    this.showMemoryGame.set(false);
    setTimeout(() => {
      this.showMemoryGame.set(true);
    }, 100);
  }
}
