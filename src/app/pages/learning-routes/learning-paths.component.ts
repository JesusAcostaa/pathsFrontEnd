import { Component, inject, OnInit } from '@angular/core';
import { AuthService, LoaderService } from '../../core/services';
import { LottieComponent } from 'ngx-lottie';
import { MemoryCardGameComponent } from './components/organisms';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { routeByLearningPath } from '../../shared/utils';
import { LearningRoutes } from '../../core/interfaces';

@Component({
  selector: 'app-learning-paths',
  standalone: true,
  imports: [LottieComponent, MemoryCardGameComponent, NgIf, RouterOutlet],
  templateUrl: './learning-paths.component.html',
  styleUrl: './learning-paths.component.css',
})
export class LearningPathsComponent implements OnInit {
  public showMemoryCardGame = true;
  public user = inject(AuthService).currentUser;
  private router = inject(Router);

  private loaderService = inject(LoaderService);

  ngOnInit() {
    const route =
      routeByLearningPath[this.user()?.learningPath ?? LearningRoutes.Mixed];
    this.router.navigate([route]);
  }

  public handleShowMemoryCardGame() {
    this.loaderService.show();
    this.showMemoryCardGame = false;
    setTimeout(() => {
      this.showMemoryCardGame = true;
      this.loaderService.hide();
    }, 250);
  }
}
