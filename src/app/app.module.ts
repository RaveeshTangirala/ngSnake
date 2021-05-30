import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { GridBoardComponent } from './grid-board/grid-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { PlayAgainButtonComponent } from './play-again-button/play-again-button.component';
import { AppRoutingModule } from './app-routing.module';
import { LevelSelectorComponent } from './level-selector/level-selector.component';
import { MatListModule } from '@angular/material/list';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChooseLevelComponent } from './choose-level/choose-level.component';

@NgModule({
  declarations: [
    AppComponent,
    LevelSelectorComponent,
    GridBoardComponent,
    PlayAgainButtonComponent,
    PageNotFoundComponent,
    ChooseLevelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    NgbModule,
    MatButtonModule,
    AppRoutingModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }