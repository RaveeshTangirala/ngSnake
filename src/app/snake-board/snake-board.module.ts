import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridBoardComponent } from './grid-board/grid-board.component';
import { PlayAgainButtonComponent } from './play-again-button/play-again-button.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { LevelSelectorComponent } from './level-selector/level-selector.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		GridBoardComponent,
		LevelSelectorComponent,
		PlayAgainButtonComponent,
	],
	imports: [
		CommonModule,
		MatGridListModule,
		MatButtonModule,
		MatSelectModule,
		FormsModule,
	],
	exports: [GridBoardComponent],
})
export class SnakeBoardModule {}
