import { Component, OnInit, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-memory-card-game',
  templateUrl: './memory-card-game.component.html',
  styleUrl: './memory-card-game.component.css',
  standalone: true,
  imports: [ButtonModule, LottieComponent],
})
export class MemoryCardGameComponent implements OnInit {
  public openCards: any[] = [];
  public cards: any[] = [];
  public movesCounter: any;
  public deck: any;
  public shuffledCards: any[] = [];
  public moves: number = 0;
  public match: number = 0;
  public sec: number = 0;
  public min: number = 0;
  public timeCounter: any;
  public timer: any;
  public timerDelay: number = 0;
  public modal: any;
  public stat: any;
  public timerText: string = '';
  public modalMsg: string = '';
  public stars: any;
  public starCount: number = 3;
  public statMsg: any;
  public restart: any;

  public options: AnimationOptions = {
    path: 'https://lottie.host/b991af51-42dd-4bed-9f49-46545aa978e0/vVKGtQXZll.json',
  };

  public onReset = output();

  ngOnInit(): void {
    this.cards = Array.from(document.getElementsByClassName('card'));
    this.movesCounter = document.querySelector('.moves');
    this.deck = document.querySelector('.deck');
    this.timeCounter = document.querySelector('.timer');
    this.modal = document.querySelector('.modal');
    this.stat = document.querySelector('.end-msg');
    this.stars = document.querySelector('.stars')?.getElementsByTagName('li');
    this.statMsg = document.querySelector('.stats');
    this.restart = document.querySelector('.restart');

    this.restart.addEventListener('click', () => {
      this.onReset.emit();
    });
    this.setDeck();
  }

  setDeck() {
    this.shuffledCards = this.shuffle(this.cards);
    for (let i = 0; i < this.shuffledCards.length; i++) {
      this.deck.appendChild(this.shuffledCards[i]);
      this.shuffledCards[i].classList.remove('open', 'show', 'match', 'shake');
    }
    this.setMoves();
    this.showFirst();
    setTimeout(() => {
      this.hideCards();
      this.startGame();
    }, 500);
  }

  showFirst() {
    for (let i = 0; i < this.shuffledCards.length; i++) {
      this.shuffledCards[i].classList.add('open', 'show');
    }
  }

  hideCards() {
    for (let i = 0; i < this.shuffledCards.length; i++) {
      this.shuffledCards[i].classList.remove('open', 'show');
    }
  }

  setMoves() {
    this.movesCounter.textContent = this.moves;
  }

  startGame() {
    for (let i = 0; i < this.cards.length; i++) {
      this.shuffledCards[i].addEventListener(
        'click',
        this.flipCardUp.bind(this)
      );
    }
  }

  flipCardUp(event: any) {
    this.showCard(event);
    this.addToOpenCards(event.target);
    this.timerDelay++;

    if (this.timerDelay === 1) {
      this.startTimer();
    }

    if (this.openCards.length === 2) {
      let prev = this.openCards[0];
      let curr = this.openCards[1];
      this.checkMatch(prev, curr);
    }

    if (this.match === 8) {
      this.endGame();
    }
  }

  checkMatch(prev: any, curr: any) {
    if (prev.innerHTML === curr.innerHTML) {
      this.isMatch(prev, curr);
    } else {
      this.notMatch(prev, curr);
    }

    this.incrementMoves();
    this.starRating();
    this.openCards = [];
  }

  isMatch(prev: any, curr: any) {
    prev.classList.add('match');
    curr.classList.add('match');
    this.match++;
  }

  notMatch(prev: any, curr: any) {
    setTimeout(() => {
      prev.classList.add('shake');
      curr.classList.add('shake');
      prev.classList.remove('open', 'show');
      curr.classList.remove('open', 'show');
    }, 300);
  }

  incrementMoves() {
    this.moves++;
    this.setMoves();
  }

  starRating() {
    if (this.moves > 16) {
      this.stars[2].classList.add('zoomOut');
      this.starCount = 2;
    }

    if (this.moves > 22) {
      this.stars[1].classList.add('zoomOut');
      this.starCount = 1;
    }
  }

  addToOpenCards(c: any) {
    this.openCards.push(c);
  }

  showCard(event: any) {
    event.target.classList.add('open', 'show');
  }

  startTimer() {
    this.timer = setInterval(this.buildTimer.bind(this), 1000);
  }

  buildTimer() {
    ++this.sec;
    this.min = Math.floor(this.sec / 60);
    this.sec = Math.floor(this.sec % 60);
    this.timerText = this.pad(this.min) + ':' + this.pad(this.sec);
    this.timeCounter.innerHTML = this.timerText;
  }

  pad(value: number) {
    let string = value + '';
    if (string.length < 2) {
      return '0' + string;
    } else {
      return string;
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    this.sec = 0;
    this.min = 0;
    this.timerText = '';
  }

  buildModalMsg() {
    this.modalMsg = `<p>Has hecho ${this.moves} movimientos en ${this.min} minutos y ${this.sec} segundos!</p><p>¡Has recibido ${this.starCount} estrellas! ⭐️</p>`;
  }

  buildModal() {
    this.statMsg.innerHTML = '';
    this.statMsg.innerHTML = this.modalMsg;
  }

  showModal() {
    this.buildModal();

    this.runClick();
    window.onclick = (event: any) => {
      if (event.target == this.modal) {
        this.hideModal();
      }
    };

    this.modal.style.display = 'block';
  }

  runClick() {
    const playAgainButton = document.querySelector(
      '#play-again'
    ) as HTMLButtonElement;

    playAgainButton.onclick = () => this.onReset.emit();
  }

  hideModal() {
    this.modal.style.display = 'none';
  }

  endGame() {
    this.buildModalMsg();
    this.stopTimer();
    this.showModal();
  }

  shuffle(array: any[]): any[] {
    let currentIndex = array.length;
    let temporaryValue: any;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
