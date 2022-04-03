import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CellType } from '../enums/cell-types';
import { board1 } from '../board-data/board-1';
import { board2 } from '../board-data/board-2';
import { board3 } from '../board-data/board-3';

@Injectable({
	providedIn: 'root',
})
export class BoardDataService {
	selectedLevel$ = new BehaviorSubject<string>('1');

	boardData$: Observable<CellType[]> = this.selectedLevel$.pipe(
		map((level: string) => {
			return this.getBoardData(level);
		})
	);

	constructor() {}

	private getBoardData(level: string): CellType[] {
		switch (level) {
			case '1':
				return board1;
			case '2':
				return board2;
			case '3':
				return board3;
			default:
				return board1;
		}
	}
}
