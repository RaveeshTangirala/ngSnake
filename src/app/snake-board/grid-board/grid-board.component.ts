import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ArrowKeys } from '../enums/arrow-keys';
import { CellType } from '../enums/cell-types';
import { BoardDataService } from '../services/board-data.service';
import { LevelSelectorComponent } from '../level-selector/level-selector.component';
import { PlayAgainButtonComponent } from '../play-again-button/play-again-button.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'grid-board',
  templateUrl: './grid-board.component.html',
  styleUrls: ['./grid-board.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LevelSelectorComponent,
    PlayAgainButtonComponent,
    CommonModule,
    MatGridListModule,
  ],
  standalone: true,
})
export class GridBoardComponent implements OnInit, OnDestroy {
  score: number = 0;
  isGameOver: boolean;

  boardData: CellType[];
  private _boardDataSubscription: Subscription;

  readonly boardWidth: number = 40;
  private readonly _boardHeight: number = 30;
  private readonly _boardMaxCells: number = this.boardWidth * this._boardHeight;

  private _key: ArrowKeys = ArrowKeys.ArrowLeft;
  private _keyBuffer: ArrowKeys[] = [];
  private _snakeBody: number[] = [];

  private _snakeSpeed: number = 250;
  private _foodPosition: number = 780;
  private _freeBlocks: number[] = [];
  private _startTime: number;
  private _animationFrame: number;

  constructor(
    private _boardDataService: BoardDataService,
    private _ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._boardDataSubscription = this._boardDataService.boardData$.subscribe(
      (boardData: CellType[]) => {
        this.boardData = boardData.slice(0); // creates a copy
        this.startGame();
      }
    );
  }

  ngOnDestroy(): void {
    window.cancelAnimationFrame(this._animationFrame);
    this._boardDataSubscription.unsubscribe();
  }

  getCellColour(cellType: CellType, index: number): string {
    switch (cellType) {
      case CellType.Free:
        this._freeBlocks.push(index);
        return 'black';
      case CellType.Wall:
        return 'white';
      case CellType.Body:
        return 'green';
      case CellType.Food:
        return 'red';
      default:
        return '';
    }
  }

  trackByGrid(index: number): number {
    return index;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this._keyBuffer.length === 2) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        if (this._key === ArrowKeys.ArrowDown) return;
        this._key = ArrowKeys.ArrowUp;
        this._keyBuffer.push(ArrowKeys.ArrowUp);
        break;
      case 'ArrowDown':
        if (this._key === ArrowKeys.ArrowUp) return;
        this._key = ArrowKeys.ArrowDown;
        this._keyBuffer.push(ArrowKeys.ArrowDown);
        break;
      case 'ArrowLeft':
        if (this._key === ArrowKeys.ArrowRight) return;
        this._key = ArrowKeys.ArrowLeft;
        this._keyBuffer.push(ArrowKeys.ArrowLeft);
        break;
      case 'ArrowRight':
        if (this._key === ArrowKeys.ArrowLeft) return;
        this._key = ArrowKeys.ArrowRight;
        this._keyBuffer.push(ArrowKeys.ArrowRight);
        break;
    }
  }

  gameOver(): void {
    this.isGameOver = true;
    this._keyBuffer = [];
    window.cancelAnimationFrame(this._animationFrame);
  }

  startGame(): void {
    this.score = 0;
    this.isGameOver = false;
    this._snakeSpeed = 250;
    this._keyBuffer = [];
    this._key = ArrowKeys.ArrowLeft;
    this.setUpSnake();
    this.setUpFood();

    this._startTime = Date.now();
    this._animationFrame = window.requestAnimationFrame(() =>
      this.createInterval()
    );
  }

  private setUpFood(): void {
    this.boardData[this._foodPosition] = CellType.Free;
    this._foodPosition = 780;
    this.boardData[this._foodPosition] = CellType.Food;
  }

  private setUpSnake(): void {
    for (let position of this._snakeBody) {
      if (this.boardData[position] === CellType.Body) {
        this.boardData[position] = CellType.Free;
      }
    }
    this._snakeBody = [825, 826, 827];
    for (let position of this._snakeBody) {
      this.boardData[position] = CellType.Body;
    }
  }

  private createInterval(): void {
    if (!this.isGameOver && Date.now() - this._startTime >= this._snakeSpeed) {
      this.updateFoodPosition();
      const newHeadPosition = this.getNewSnakeHeadPosition();
      this.handleSnakeCollision(newHeadPosition);
      this.moveSnakeBody(newHeadPosition);
      this.updateDataWhenFoodIsConsumed();
      this._keyBuffer = [];
      this._freeBlocks = [];
      this._ref.detectChanges();
      this._startTime = Date.now();
    }

    this._animationFrame = window.requestAnimationFrame(() =>
      this.createInterval()
    );
  }

  private updateDataWhenFoodIsConsumed(): void {
    if (this._snakeBody[0] === this._foodPosition) {
      this._snakeBody.push(this._foodPosition);
      this._snakeSpeed *= this._snakeSpeed > 50 ? 0.8 : 1;
      this._foodPosition = -1;
      this.score++;
    }
  }

  private handleSnakeCollision(newHeadPosition: number): void {
    switch (this.boardData[newHeadPosition]) {
      case CellType.Body:
      case CellType.Wall:
        this.gameOver();
        break;
    }
  }

  private getNewSnakeHeadPosition(): number {
    let newHeadPosition = this._snakeBody[0];
    const firstKey =
      this._keyBuffer.length > 0 ? this._keyBuffer[0] : this._key;

    switch (firstKey) {
      case ArrowKeys.ArrowUp:
        newHeadPosition -= this.boardWidth;
        if (newHeadPosition < 0) newHeadPosition += this._boardMaxCells;
        break;
      case ArrowKeys.ArrowDown:
        newHeadPosition += this.boardWidth;
        if (newHeadPosition > this._boardMaxCells - 1)
          newHeadPosition -= this._boardMaxCells;
        break;
      case ArrowKeys.ArrowLeft:
        newHeadPosition -= 1;
        if ((newHeadPosition + 1) % this.boardWidth === 0)
          newHeadPosition += this.boardWidth;
        break;
      case ArrowKeys.ArrowRight:
        newHeadPosition += 1;
        if (newHeadPosition % this.boardWidth === 0)
          newHeadPosition -= this.boardWidth;
        break;
    }

    return newHeadPosition;
  }

  private moveSnakeBody(newHeadPosition: number): void {
    if (!this.isGameOver) {
      this.boardData[this._snakeBody.pop()!] = CellType.Free;
      this._snakeBody.unshift(newHeadPosition);

      for (let i = 0; i < this._snakeBody.length; i++) {
        this.boardData[this._snakeBody[i]] = CellType.Body;
      }
    }
  }

  private updateFoodPosition(): void {
    if (this._foodPosition < 0) {
      this._foodPosition =
        this._freeBlocks[Math.floor(Math.random() * this._freeBlocks.length)];
      this.boardData[this._foodPosition] = CellType.Food;
    }
  }
}
