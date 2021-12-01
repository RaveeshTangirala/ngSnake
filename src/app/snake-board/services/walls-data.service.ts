import { Injectable } from '@angular/core';
import { CellType } from '../grid-board/grid-board.component';

@Injectable({
  providedIn: 'root'
})
export class WallsDataService {
  boardData: Array<CellType> = new Array<CellType>();

  constructor() { }
}
