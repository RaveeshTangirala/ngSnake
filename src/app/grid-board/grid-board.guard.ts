import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridBoardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return import('../walls/wall_' + route.params['id'] + '.json')
      .then((x: Array<number>) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return this.router.navigateByUrl('/404');
      })
    ;
  }
}