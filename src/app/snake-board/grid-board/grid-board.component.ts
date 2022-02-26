import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArrowKeys } from '../enums/arrow-keys';
import { CellType } from '../enums/cell-types';
import { WallsDataService } from '../services/walls-data.service';

@Component({
  selector: 'grid-board',
  templateUrl: './grid-board.component.html',
  styleUrls: ['./grid-board.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridBoardComponent implements OnInit, OnDestroy {
  score: number = 0;
  isGameOver: boolean;

  boardData: Array<CellType> = this.wallsService.boardData;
  level: string = this.route.snapshot.paramMap.get('id')!;

  readonly boardWidth: number = 40;
  private readonly boardHeight: number = 30;
  private readonly boardMaxCells: number = this.boardWidth * this.boardHeight;

  private key: ArrowKeys = ArrowKeys.ArrowLeft;
  private keyBuffer: Array<ArrowKeys> = new Array<ArrowKeys>();
  private snakeBody: Array<number> = new Array<number>();

  private snakeSpeed: number = 250;
  private foodPosition: number = 780;
  private freeBlocks: Array<number> = [];
  private startTime: number;
  private animationFrame: number;

  constructor(
    private route: ActivatedRoute,
    private wallsService: WallsDataService,
    private ref: ChangeDetectorRef
  ) {
    this.setUpSnake();
  }

  ngOnInit(): void {
    this.startTime = Date.now();
    this.animationFrame = window.requestAnimationFrame(() =>
      this.createInterval()
    );
  }

  ngOnDestroy(): void {
    window.cancelAnimationFrame(this.animationFrame);
  }

  getCellColour(cellType: CellType, index: number): string {
    switch (cellType) {
      case CellType.Free:
        this.freeBlocks.push(index);
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
    if (this.keyBuffer.length === 2) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        if (this.key === ArrowKeys.ArrowDown) return;
        this.key = ArrowKeys.ArrowUp;
        this.keyBuffer.push(ArrowKeys.ArrowUp);
        break;
      case 'ArrowDown':
        if (this.key === ArrowKeys.ArrowUp) return;
        this.key = ArrowKeys.ArrowDown;
        this.keyBuffer.push(ArrowKeys.ArrowDown);
        break;
      case 'ArrowLeft':
        if (this.key === ArrowKeys.ArrowRight) return;
        this.key = ArrowKeys.ArrowLeft;
        this.keyBuffer.push(ArrowKeys.ArrowLeft);
        break;
      case 'ArrowRight':
        if (this.key === ArrowKeys.ArrowLeft) return;
        this.key = ArrowKeys.ArrowRight;
        this.keyBuffer.push(ArrowKeys.ArrowRight);
        break;
    }
  }

  gameOver(): void {
    this.isGameOver = true;
    this.keyBuffer = [];
    window.cancelAnimationFrame(this.animationFrame);
  }

  playAgain(): void {
    this.isGameOver = false;
    this.snakeSpeed = 250;
    this.score = 0;
    this.keyBuffer = [];
    this.key = ArrowKeys.ArrowLeft;
    this.setUpSnake();
    this.setUpFood();
    this.animationFrame = window.requestAnimationFrame(() =>
      this.createInterval()
    );
  }

  private setUpFood(): void {
    this.boardData[this.foodPosition] = CellType.Free;
    this.foodPosition = 780;
    this.boardData[this.foodPosition] = CellType.Food;
  }

  private setUpSnake(): void {
    for (let position of this.snakeBody) {
      this.boardData[position] = CellType.Free;
    }
    this.snakeBody = [825, 826, 827];
    for (let position of this.snakeBody) {
      this.boardData[position] = CellType.Body;
    }
  }

  private createInterval(): void {
    if (Date.now() - this.startTime >= this.snakeSpeed) {
      this.updateFoodPosition();
      const newHeadPosition = this.getNewSnakeHeadPosition();
      this.handleSnakeCollision(newHeadPosition);
      this.moveSnakeBody(newHeadPosition);
      this.updateDataWhenFoodIsConsumed();
      this.keyBuffer = [];
      this.freeBlocks = [];
      this.ref.markForCheck();
      this.startTime = Date.now();
    }

    this.animationFrame = window.requestAnimationFrame(() =>
      this.createInterval()
    );
  }

  private updateDataWhenFoodIsConsumed(): void {
    if (this.snakeBody[0] === this.foodPosition) {
      this.snakeBody.push(this.foodPosition);
      this.snakeSpeed *= this.snakeSpeed > 50 ? 0.8 : 1;
      this.foodPosition = -1;
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
    let newHeadPosition = this.snakeBody[0];
    const firstKey = this.keyBuffer.length > 0 ? this.keyBuffer[0] : this.key;

    switch (firstKey) {
      case ArrowKeys.ArrowUp:
        newHeadPosition -= this.boardWidth;
        if (newHeadPosition < 0) newHeadPosition += this.boardMaxCells;
        break;
      case ArrowKeys.ArrowDown:
        newHeadPosition += this.boardWidth;
        if (newHeadPosition > this.boardMaxCells - 1)
          newHeadPosition -= this.boardMaxCells;
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
      this.boardData[this.snakeBody.pop()!] = CellType.Free;
      this.snakeBody.unshift(newHeadPosition);

      for (let i = 0; i < this.snakeBody.length; i++) {
        this.boardData[this.snakeBody[i]] = CellType.Body;
      }
    }
  }

  private updateFoodPosition(): void {
    if (this.foodPosition < 0) {
      this.foodPosition =
        this.freeBlocks[Math.floor(Math.random() * this.freeBlocks.length)];
      this.boardData[this.foodPosition] = CellType.Food;
    }
  }
}
