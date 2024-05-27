import { Component, inject } from '@angular/core';
import { AuthService, LoaderService } from '../../core/services';
import { LottieComponent } from 'ngx-lottie';
import { MemoryCardGameComponent } from './components/organisms/memory-card-game/memory-card-game.component';
import { NgIf } from '@angular/common';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-learning-paths',
  standalone: true,
  imports: [LottieComponent, MemoryCardGameComponent, NgIf, RouterOutlet],
  templateUrl: './learning-paths.component.html',
  styleUrl: './learning-paths.component.css',
})
export class LearningPathsComponent {
  public showMemoryCardGame = true;
  public user = inject(AuthService).currentUser;

  private loaderService = inject(LoaderService);

  public handleShowMemoryCardGame() {
    this.loaderService.show();
    this.showMemoryCardGame = false;
    setTimeout(() => {
      this.showMemoryCardGame = true;
      this.loaderService.hide();
    }, 250);
  }
}
