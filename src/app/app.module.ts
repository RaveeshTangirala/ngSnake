import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { GridBoardComponent } from './grid-board/grid-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { PlayAgainButtonComponent } from './play-again-button/play-again-button.component';

@NgModule({
  declarations: [
    AppComponent,
    GridBoardComponent,
    PlayAgainButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    NgbModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
