import { Component, inject, input, OnInit, signal } from '@angular/core';
import { HomophoneOption, HomophoneQuestion } from '../../../interfaces';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { JsonPipe, NgClass, TitleCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-homophone-challenge',
  standalone: true,
  imports: [
    CardModule,
    RippleModule,
    TitleCasePipe,
    NgClass,
    ButtonModule,
    JsonPipe,
  ],
  templateUrl: './homophone-challenge.component.html',
  styleUrl: './homophone-challenge.component.css',
})
export class HomophoneChallengeComponent implements OnInit {
  public homophoneQuestions = input<HomophoneQuestion[]>();
  public question = signal<HomophoneQuestion>({
    audio: '',
    options: [],
  });
  public isCorrectOption = signal<boolean | null>(null);
  public isOptionSelected = signal(false);

  public gameSoundOptions = {
    failed: './assets/audios/ui/failed.mp3',
    success: './assets/audios/ui/success.mp3',
    button: './assets/audios/ui/button.mp3',
    start: './assets/audios/ui/start.mp3',
  };

  ngOnInit() {
    this.generateRandomQuestion();
  }

  public generateRandomQuestion() {
    this.resetOptions();

    const index = this.getRandomIndex();
    const question = this.homophoneQuestions()?.at(index);

    if (question) {
      if (this.question().audio === question.audio) {
        this.generateRandomQuestion();
        return;
      }

      this.playSound(this.gameSoundOptions.start);
      this.question.update(q => ({ ...q, ...question }));
    }
  }

  private getRandomIndex() {
    const length = this.homophoneQuestions()?.length || 0;
    return Math.floor(Math.random() * length);
  }

  private resetOptions() {
    this.isCorrectOption.set(null);
    this.isOptionSelected.set(false);
    this.question().options.forEach(opt => (opt.selected = false));
  }

  public handleOptionClick(option: HomophoneOption) {
    option.selected = true;
    this.isOptionSelected.set(true);
    this.isCorrectOption.set(option.correct);

    option.correct
      ? this.playSound(this.gameSoundOptions.success)
      : this.playSound(this.gameSoundOptions.failed);
  }

  public playSound(sound: string) {
    const audio = new Audio(sound);
    audio.play().then();
  }
}
