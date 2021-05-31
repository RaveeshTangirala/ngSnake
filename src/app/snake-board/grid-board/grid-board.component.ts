import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArrowKeys } from '../../arrow-keys-enum/arrow-keys';

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
  readonly boardHeight: number = 30;
  readonly boardMaxCells: number = this.boardWidth * this.boardHeight;

  score: number = 0;
  isGameOver: boolean = false;
  walls: Array<number> = new Array<number>();
  snakeBody: Array<number> = new Array<number>();
  key: ArrowKeys = ArrowKeys.ArrowLeft;
  snakeSpeed: number = 500;
  foodPosition: number = 780;
  timeIntervalId: any;
  freeBlocks: Array<number> = new Array<number>();
  boardMaxCellsArr = new Array(this.boardMaxCells);
  level: number = 0;

  routeSubscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.level = params['id'];
      import('../../walls-data/wall_' + params['id'] + '.json').then((x: Array<number>) =>
        this.walls = JSON.parse(JSON.stringify(x)).default
      );
    });
    this.setUpSnake();
    this.createInterval();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    clearInterval(this.timeIntervalId);
  }

  getGridColor(index: number): string {
    let gridColour = 'black';

    if (this.snakeBody.includes(index)) {
      gridColour = 'green';
    }
    else if (this.foodPosition === index) {
      gridColour = 'red';
    }
    else if (this.walls.includes(index)) {
      gridColour = 'white';
    }
    else {
      this.freeBlocks.push(index);
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
    clearInterval(this.timeIntervalId);
  }

  playAgain(): void {
    this.isGameOver = false;
    this.snakeSpeed = 400;
    this.foodPosition = 780;
    this.score = 0;
    this.key = ArrowKeys.ArrowLeft;
    this.setUpSnake();
    this.createInterval();
  }

  private setUpSnake(): void {
    this.snakeBody = [];
    this.snakeBody.push(825);
    this.snakeBody.push(826);
    this.snakeBody.push(827);
  }

  private createInterval(): void {
    clearInterval(this.timeIntervalId);
    this.updateFoodPosition();
    let newHeadPosition = this.getNewSnakeHeadPosition();
    this.handleSnakeCollision(newHeadPosition);
    this.moveSnakeBody(newHeadPosition);
    this.updateSnakeSpeed();
    this.freeBlocks = [];

    this.timeIntervalId = setInterval(() => {
      this.createInterval();
      if (this.isGameOver)
        clearInterval(this.timeIntervalId);
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
    for (let i = 2; i < this.snakeBody.length; i++) {
      if (newHeadPosition === this.snakeBody[i] || this.walls.includes(newHeadPosition)) {
        this.gameOver();
        break;
      }
    }
  }

  private getNewSnakeHeadPosition(): number {
    let newHeadPosition = this.snakeBody[0];

    switch (this.key) {
      case ArrowKeys.ArrowUp:
        newHeadPosition -= this.boardWidth;
        if (newHeadPosition < 0)
          newHeadPosition += this.boardMaxCells;
        break;
      case ArrowKeys.ArrowDown:
        newHeadPosition += this.boardWidth;
        if (newHeadPosition > 1199)
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
      this.snakeBody.unshift(newHeadPosition);
      this.snakeBody.pop();
    }
  }

  private updateFoodPosition(): void {
    if (this.foodPosition < 0) {
      this.foodPosition = this.freeBlocks[this.getRandomNumber()];
    }
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * this.freeBlocks.length);
  }
}