import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CellType } from './enums/cell-types';
import { WallsDataService } from './services/walls-data.service';

@Injectable({
  providedIn: 'root',
})
export class GridBoardGuard implements CanActivate {
  constructor(
    private router: Router,
    private wallsDataService: WallsDataService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return import('./board-data/board-' + route.params['id'] + '.json')
      .then((boardData: Array<CellType>) => {
        this.wallsDataService.boardData = JSON.parse(
          JSON.stringify(boardData)
        ).default;
        return true;
      })
      .catch((err) => {
        console.log(err);
        return this.router.navigateByUrl('/404');
      });
  }
}
