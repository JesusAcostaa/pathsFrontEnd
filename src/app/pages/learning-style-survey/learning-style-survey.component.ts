import { Component, inject, signal } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { NgClass, TitleCasePipe } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';
import { RippleModule } from 'primeng/ripple';
import confetti from 'canvas-confetti';
import {
  AuthService,
  LoaderService,
  StudentsService,
} from '../../core/services';
import { LearningStyleSurvey, SurveyOption, SurveyResult } from './interfaces';
import { survey } from './utils/survey';
import { withLoader } from '../../core/decorartors';
import { Router } from '@angular/router';
import { LearningStyle } from '../../core/services/students.service';
import { FormatLearningStylePipe } from './utils/format-learning-style.pipe';

@Component({
  selector: 'app-learning-style-survey',
  standalone: true,
  imports: [
    StepperModule,
    NgClass,
    RippleModule,
    LottieComponent,
    ButtonModule,
    TitleCasePipe,
    FormatLearningStylePipe,
  ],
  templateUrl: './learning-style-survey.component.html',
  styleUrl: './learning-style-survey.component.css',
})
export class LearningStyleSurveyComponent {
  public authService = inject(AuthService);

  public active: number = 0;
  public surveys: LearningStyleSurvey[] = survey;

  public surveyResults = signal<SurveyResult[]>([]);
  public isOptionSelected = signal<boolean>(false);
  public isSurveyCompleted = signal<boolean>(false);
  public learningStyle = signal<LearningStyle | null>(null);

  readonly loaderService = inject(LoaderService);
  private studentsService = inject(StudentsService);
  private router = inject(Router);

  public handleSurveyOptionClick(option: SurveyOption, index: number): void {
    this.isOptionSelected.set(true);
    const survey = this.surveys[this.active];
    this.resetOptions();

    option.isClicked = true;
    this.surveyResults.update(results => {
      if (!results) {
        results = [];
      }

      if (!results[this.active]) {
        results[this.active] = {};
      }

      results[this.active][survey.key] = index + 1;
      return results;
    });

    this.showStars();
  }

  public handleNext(): void {
    if (this.surveyResults().length === 8) {
      this.finishSurvey();
    }

    this.isOptionSelected.set(false);
  }

  private resetOptions(): void {
    this.surveys[this.active].options.forEach(option => {
      option.isClicked = false;
    });
  }

  private showStars(): void {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#6366F1', '#5b5b93', '#7e76ef', '#38337a', '#6056ec'],
    };

    confetti({
      ...defaults,
      particleCount: 5,
      scalar: 1.2,
      shapes: ['star'],
    });
  }

  private finishSurvey(): void {
    const end = Date.now() + 1.5 * 1000;
    const colors = ['#6366F1', '#bbbcf5'];
    const frame = () => {
      confetti({
        particleCount: 1.6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 1.6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        this.getLearningStyle();
      }
    };

    frame();
  }

  public navigateToLearningRoutes(): void {
    this.router.navigateByUrl('/inicio/rutas-aprendizaje');
  }

  @withLoader()
  private async getLearningStyle(): Promise<void> {
    const response = await this.studentsService.getLearningStyle(
      this.surveyResults()
    );

    const user = {
      role: this.currentUser()!.role,
      photoURL: this.currentUser()!.photoURL,
      name: this.currentUser()!.name,
      email: this.currentUser()!.email,
      id: this.currentUser()!.id,
    };

    await this.studentsService.update({
      ...user,
      learningPath: response.learningPath,
    });

    this.authService.updateCurrentUser({
      ...this.currentUser()!,
      menu: this.currentUser()!.menu,
      learningPath: response.learningPath,
    });

    this.learningStyle.set(response);
    this.isSurveyCompleted.set(true);
  }

  get currentUser() {
    return this.authService.currentUser;
  }
}
