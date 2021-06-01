import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WallsDataService } from './walls-data.service';

@Injectable({
  providedIn: 'root'
})
export class GridBoardGuard implements CanActivate {
  constructor(
    private router: Router,
    private wallsDataService: WallsDataService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return import('../../walls-data/wall_' + route.params['id'] + '.json')
      .then((walls: Array<number>) => {
        this.wallsDataService.walls = JSON.parse(JSON.stringify(walls)).default;
        return true;
      })
      .catch((err) => {
        console.log(err);
        return this.router.navigateByUrl('/404');
      })
    ;
  }
}