import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridBoardComponent } from './grid-board/grid-board.component';
import { LevelSelectorComponent } from './level-selector/level-selector.component';

const routes: Routes = [
  { path: '', component: LevelSelectorComponent },
  { path: 'level/:id', component: GridBoardComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
