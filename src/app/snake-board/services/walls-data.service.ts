import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WallsDataService {
  walls: Array<number> = new Array<number>();

  constructor() { }
}
