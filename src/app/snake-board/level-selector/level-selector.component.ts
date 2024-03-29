import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { BoardDataService } from '../services/board-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'level-selector',
  templateUrl: './level-selector.component.html',
  styleUrls: ['./level-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule],
})
export class LevelSelectorComponent {
  selectedLevel: string = '1';

  constructor(
    private _ref: ChangeDetectorRef,
    private _boardDataService: BoardDataService
  ) {}

  selectionChange(): void {
    this._boardDataService.selectedLevel$.next(this.selectedLevel);
    this._ref.detectChanges();
  }
}
