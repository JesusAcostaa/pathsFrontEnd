export interface HomophoneOption {
  word: string;
  correct: boolean;
  selected?: boolean;
}

export interface HomophoneQuestion {
  audio: string;
  options: HomophoneOption[];
}
