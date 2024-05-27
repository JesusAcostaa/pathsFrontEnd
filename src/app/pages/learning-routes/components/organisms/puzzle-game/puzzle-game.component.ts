import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CellLocation, Direction } from './models';
import { RandomService } from '../../../services/random.service';

@Component({
  selector: 'app-puzzle-game',
  standalone: true,
  imports: [],
  templateUrl: './puzzle-game.component.html',
  styleUrl: './puzzle-game.component.css',
})
export class PuzzleGameComponent implements OnInit, AfterViewInit {
  @Input() numberOfCellsHorizontally = 3;

  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('board') boardRef!: ElementRef<HTMLDivElement>;

  readonly cellBorder = 2;
  readonly gap = 5;
  readonly outerGap = 10;
  readonly emptyCell = null;

  boardCells: HTMLDivElement[][] = [];

  constructor(private random: RandomService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.updateBoardWidth();
    const cellElements: HTMLDivElement[] = this.generateCellElements();
    cellElements.forEach(ele => this.boardRef.nativeElement.appendChild(ele));
    this.boardCells = this.getBoardCells(cellElements);
  }

  updateBoardWidth() {
    const cellWidth = this.getCellWidth();
    const boardWidth =
      (cellWidth + this.cellBorder + 2 + this.gap) *
        this.numberOfCellsHorizontally +
      this.outerGap * 2;
    this.boardRef.nativeElement.style.width = `${boardWidth}px`;
    this.boardRef.nativeElement.style.height = `${boardWidth}px`;
  }

  getCellWidth(): number {
    const containerWidth = this.containerRef.nativeElement.clientWidth;
    const basicCellWidth =
      (containerWidth - this.outerGap * 2) / this.numberOfCellsHorizontally;
    return basicCellWidth - this.gap - this.cellBorder * 2;
  }

  generateCellElements(): HTMLDivElement[] {
    let index = 0;
    const result: HTMLDivElement[] = [];
    const cellWidth = this.getCellWidth();
    const numbers = this.random.randomRange(
      this.numberOfCellsHorizontally ** 2 - 1
    );
    for (let i = 0; i < this.numberOfCellsHorizontally; i++) {
      for (let j = 0; j < this.numberOfCellsHorizontally; j++) {
        if (
          i === this.numberOfCellsHorizontally - 1 &&
          j === this.numberOfCellsHorizontally - 1
        ) {
          break;
        }
        result.push(
          this.generateCell(i, j, numbers[index++].toString(), cellWidth)
        );
      }
    }
    return result;
  }

  generateCell(
    i: number,
    j: number,
    text: string,
    cellWidth: number
  ): HTMLDivElement {
    const cellEle = document.createElement('div');
    cellEle.classList.add('cell');
    cellEle.textContent = text;
    cellEle.style.width = `${cellWidth}px`;
    cellEle.style.height = `${cellWidth}px`;
    cellEle.style.top = `${
      i * (cellWidth + this.cellBorder * 2 + this.gap) + this.outerGap
    }px`;
    cellEle.style.left = `${
      j * (cellWidth + this.cellBorder * 2 + this.gap) + this.outerGap
    }px`;
    cellEle.style.borderWidth = `${this.cellBorder}px`;
    cellEle.addEventListener('click', () => this.onCellClick(cellEle));
    return cellEle;
  }

  getBoardCells(cellElements: HTMLDivElement[]): HTMLDivElement[][] {
    const result: HTMLDivElement[][] = [];
    for (let i = 0; i < this.numberOfCellsHorizontally; i++) {
      result[i] = cellElements.slice(
        i * this.numberOfCellsHorizontally,
        (i + 1) * this.numberOfCellsHorizontally
      );
      if (i === this.numberOfCellsHorizontally - 1) {
        // @ts-ignore
        result[i][this.numberOfCellsHorizontally - 1] = this.emptyCell;
      }
    }
    return result;
  }

  getCellFromBoard(predicate: (ele: HTMLDivElement) => boolean): CellLocation {
    // @ts-ignore
    let result: CellLocation = null;
    for (let i = 0; i < this.numberOfCellsHorizontally; i++) {
      for (let j = 0; j < this.numberOfCellsHorizontally; j++) {
        const ele = this.boardCells[i][j];
        if (predicate(ele)) {
          return {
            cell: ele,
            rowIndex: i,
            columnIndex: j,
          };
        }
      }
    }
    return result;
  }

  getMoveableDirection(cell: CellLocation): Direction | null {
    const i = cell.rowIndex;
    const j = cell.columnIndex;
    if (
      this.boardCells[i - 1] &&
      this.boardCells[i - 1][j] === this.emptyCell
    ) {
      return 'top';
    }
    if (
      this.boardCells[i + 1] &&
      this.boardCells[i + 1][j] === this.emptyCell
    ) {
      return 'bottom';
    }
    if (this.boardCells[i] && this.boardCells[i][j - 1] === this.emptyCell) {
      return 'left';
    }
    if (this.boardCells[i] && this.boardCells[i][j + 1] === this.emptyCell) {
      return 'right';
    }
    return null;
  }

  move(cellLocation: CellLocation, moveableDirection: Direction) {
    const cell = cellLocation.cell;
    const i = cellLocation.rowIndex;
    const j = cellLocation.columnIndex;
    const cellWidth = this.getCellWidth();
    if (moveableDirection === 'left' || moveableDirection === 'right') {
      const newJ = moveableDirection === 'left' ? j - 1 : j + 1;
      cell.style.left = `${
        newJ * (cellWidth + this.cellBorder * 2 + this.gap) + this.outerGap
      }px`;
      this.boardCells[i][newJ] = cell;
      // @ts-ignore
      this.boardCells[i][j] = this.emptyCell;
    }
    if (moveableDirection === 'top' || moveableDirection === 'bottom') {
      const newI = moveableDirection === 'top' ? i - 1 : i + 1;
      cell.style.top = `${
        newI * (cellWidth + this.cellBorder * 2 + this.gap) + this.outerGap
      }px`;
      this.boardCells[newI][j] = cell;
      // @ts-ignore
      this.boardCells[i][j] = this.emptyCell;
    }
  }

  onCellClick(cellEle: HTMLDivElement) {
    const cellLocation = this.getCellFromBoard(x => x === cellEle);
    const moveableDirection = this.getMoveableDirection(cellLocation);
    if (moveableDirection) {
      this.move(cellLocation, moveableDirection);
      this.showMessageIfWin();
    }
  }

  showMessageIfWin() {
    let number = 1;
    let foundIncorrect = false;
    const cells: HTMLDivElement[] = [];
    this.boardCells.forEach(row => cells.push(...row));
    for (let i = 0; i < this.numberOfCellsHorizontally ** 2 - 1; i++) {
      if (
        cells[i] === this.emptyCell ||
        cells[i].textContent !== number.toString()
      ) {
        foundIncorrect = true;
        break;
      }
      number++;
    }

    if (!foundIncorrect) {
      alert('Felicitaciones! Ganaste‼️ 🎉');
    }
  }
}
