import { NgModule } from '@angular/core';
import { ChooseLevelComponent } from './choose-level.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChooseLevelComponent],
  imports: [RouterModule],
  exports: [ChooseLevelComponent]
})
export class ChooseLevelModule { }
