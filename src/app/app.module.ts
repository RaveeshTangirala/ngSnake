import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnakeBoardModule } from './snake-board/snake-board.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		NgbModule,
		MatListModule,
		SnakeBoardModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}