import { AnimationOptions } from 'ngx-lottie';

export interface SurveyOption {
  lottie: AnimationOptions;
  label: string;
  isClicked?: boolean;
}

export interface LearningStyleSurvey {
  question: string;
  key: string;
  options: SurveyOption[];
}

export interface SurveyResult {
  [key: string]: number;
}
