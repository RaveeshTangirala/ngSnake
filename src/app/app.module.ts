import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { LevelSelectorComponent } from './level-selector/level-selector.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChooseLevelModule } from './choose-level/choose-level.module';
import { SnakeBoardModule } from './snake-board/snake-board.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    LevelSelectorComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    ChooseLevelModule,
    MatListModule,
    SnakeBoardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }