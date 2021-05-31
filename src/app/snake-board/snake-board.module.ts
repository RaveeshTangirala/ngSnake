import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridBoardComponent } from './grid-board/grid-board.component';
import { PlayAgainButtonComponent } from './play-again-button/play-again-button.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { ChooseLevelModule } from '../choose-level/choose-level.module';

@NgModule({
  declarations: [
    GridBoardComponent,
    PlayAgainButtonComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    ChooseLevelModule
  ],
  exports: [
    GridBoardComponent
  ]
})
export class SnakeBoardModule { }
