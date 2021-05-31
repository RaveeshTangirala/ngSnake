import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridBoardComponent } from './snake-board/grid-board/grid-board.component';
import { GridBoardGuard } from './snake-board/grid-board.guard';
import { LevelSelectorComponent } from './level-selector/level-selector.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: LevelSelectorComponent },
  { path: 'level/:id', component: GridBoardComponent, canActivate: [GridBoardGuard] },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }