import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ArrowKeys } from '../arrow-keys';

@Component({
  selector: 'grid-board',
  templateUrl: './grid-board.component.html',
  styleUrls: ['./grid-board.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  }
})
export class GridBoardComponent implements OnInit, OnDestroy {
  readonly boardWidth: number = 40;
  readonly lastCellNumberOfRow = (this.boardWidth - 1) % 10;
  readonly boardHeight: number = this.boardWidth * 30;
  readonly minimum: number = 0;
  readonly maximum: number = this.boardHeight - 1;

  score: number = 0;
  isGameOver: boolean = false;
  snakeBody: Array<number> = new Array<number>();
  key: ArrowKeys = ArrowKeys.ArrowLeft;
  snakeSpeed: number = 500;
  foodPosition: number = 780;
  timeInterval: any;
  boardHeightArr = new Array(this.boardHeight);

  constructor() {}

  ngOnInit(): void {
    this.setUpSnake();
    this.createInterval();
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }

  getGridColor(index: number): string {
    let gridColour = 'black';

    if (this.snakeBody.includes(index)) {
      gridColour = 'green';
    }
    else if (this.foodPosition === index) {
      gridColour = 'red';
    }

    return gridColour;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        if (this.key === ArrowKeys.ArrowDown)
          return;
        this.key = ArrowKeys.ArrowUp;
        break;
      case 'ArrowDown':
        if (this.key === ArrowKeys.ArrowUp)
          return;
        this.key = ArrowKeys.ArrowDown;
        break;
      case 'ArrowLeft':
        if (this.key === ArrowKeys.ArrowRight)
          return;
        this.key = ArrowKeys.ArrowLeft;
        break;
      case 'ArrowRight':
        if (this.key === ArrowKeys.ArrowLeft)
          return;
        this.key = ArrowKeys.ArrowRight;
        break;
    }
  }

  gameOver(): void {
    this.isGameOver = true;
    clearInterval(this.timeInterval);
  }

  playAgain(): void {
    this.isGameOver = false;
    this.snakeSpeed = 500;
    this.foodPosition = 780;
    this.score = 0;
    this.key = ArrowKeys.ArrowLeft;
    this.setUpSnake();
  }

  private setUpSnake(): void {
    this.snakeBody = [];
    this.snakeBody.push(825);
    this.snakeBody.push(826);
    this.snakeBody.push(827);
  }

  private createInterval(): void {
    clearInterval(this.timeInterval);
    this.updateFoodPosition();
    let newHeadPosition = this.getNewSnakeHeadPosition();
    this.handleSnakeCollision(newHeadPosition);
    this.moveSnakeBody(newHeadPosition);
    this.updateSnakeSpeed();

    this.timeInterval = setInterval(() => {
      this.createInterval();
    }, this.snakeSpeed);
  }

  private updateSnakeSpeed(): void {
    if (this.snakeBody[0] === this.foodPosition) {
      this.snakeBody.unshift(this.foodPosition);
      this.snakeSpeed *= this.snakeSpeed > 50 ? 0.8 : 1;
      this.foodPosition = -1;
      this.score++;
    }
  }

  private handleSnakeCollision(newHeadPosition: number): void {
    // snake body collision
    for (let i = 3; i < this.snakeBody.length; i++) {
      if (newHeadPosition === this.snakeBody[i]) {
        this.gameOver();
        break;
      }
    }

    // snake wall collision
    if (
      newHeadPosition < 0 || newHeadPosition >= this.boardHeight ||
      (this.snakeBody[0] % this.boardWidth === 0 && newHeadPosition % 10 === this.lastCellNumberOfRow) ||
      (this.snakeBody[0] % 10 === this.lastCellNumberOfRow && newHeadPosition % this.boardWidth === 0)
    ) {
      this.gameOver();
    }
  }

  private getNewSnakeHeadPosition(): number {
    let newHeadPosition = this.snakeBody[0];

    switch (this.key) {
      case ArrowKeys.ArrowUp:
        newHeadPosition -= this.boardWidth;
        break;
      case ArrowKeys.ArrowDown:
        newHeadPosition += this.boardWidth;
        break;
      case ArrowKeys.ArrowLeft:
        newHeadPosition -= 1;
        break;
      case ArrowKeys.ArrowRight:
        newHeadPosition += 1;
        break;
    }

    return newHeadPosition;
  }

  private moveSnakeBody(newHeadPosition: number): void {
    if (!this.isGameOver) {
      this.snakeBody.unshift(newHeadPosition);
      this.snakeBody.pop();
    }
  }

  private updateFoodPosition(): void {
    if (this.foodPosition < 0) {
      this.foodPosition = this.getRandomNumber();
    }
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * (this.maximum - this.minimum + 1)) + this.minimum;
  }
}