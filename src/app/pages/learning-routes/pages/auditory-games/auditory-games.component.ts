import { Component, signal } from '@angular/core';
import {
  HomophoneChallengeComponent,
  MemoryCardGameComponent,
} from '../../components/organisms';
import { NgIf } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { HomophoneQuestion } from '../../interfaces';

@Component({
  selector: 'app-auditory-games',
  standalone: true,
  imports: [
    MemoryCardGameComponent,
    NgIf,
    TabViewModule,
    HomophoneChallengeComponent,
  ],
  templateUrl: './auditory-games.component.html',
  styleUrl: './auditory-games.component.css',
})
export class AuditoryGamesComponent {
  public homophoneQuestions = signal<HomophoneQuestion[]>([
    {
      audio: './assets/audios/caza.m4a',
      options: [
        { word: 'caza', correct: true, selected: false },
        { word: 'casa', correct: false, selected: false },
      ],
    },
    {
      audio: './assets/audios/ola.m4a',
      options: [
        { word: 'ola', correct: true, selected: false },
        { word: 'hola', correct: false, selected: false },
      ],
    },
    {
      audio: './assets/audios/bello.m4a',
      options: [
        { word: 'bello', correct: true, selected: false },
        { word: 'vello', correct: false, selected: false },
      ],
    },
    {
      audio: './assets/audios/asar.m4a',
      options: [
        { word: 'asar', correct: true, selected: false },
        { word: 'azar', correct: false, selected: false },
      ],
    },
    {
      audio: './assets/audios/fe.m4a',
      options: [
        { word: 'fe', correct: true, selected: false },
        { word: 'fé', correct: false, selected: false },
      ],
    },
    {
      audio: './assets/audios/feria.m4a',
      options: [
        { word: 'feria', correct: true, selected: false },
        { word: 'fería', correct: false, selected: false },
      ],
    },
    {
      audio: './assets/audios/caso.m4a',
      options: [
        { word: 'caso', correct: true, selected: false },
        { word: 'cazo', correct: false, selected: false },
      ],
    },
  ]);
}
