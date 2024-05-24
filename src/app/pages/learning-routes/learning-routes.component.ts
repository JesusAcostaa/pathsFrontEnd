import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-learning-routes',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './learning-routes.component.html',
  styleUrl: './learning-routes.component.css',
})
export class LearningRoutesComponent {
  public user = inject(AuthService).currentUser;

  public options: AnimationOptions = {
    path: 'https://lottie.host/d7542419-a357-4fc5-b1ac-649bb9258e83/gop9P0TQbN.json',
  };
}
