import { Injectable } from '@angular/core';
import { CellType } from '../enums/cell-types';

@Injectable({
  providedIn: 'root'
})
export class WallsDataService {
  boardData: Array<CellType> = new Array<CellType>();

  constructor() { }
}
