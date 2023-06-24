import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'play-again-button',
  templateUrl: './play-again-button.component.html',
  styleUrls: ['./play-again-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PlayAgainButtonComponent {
  @Input() buttonText: string = 'Play Again?';
  @Output() click: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  buttonClicked(): void {
    this.click.emit();
  }
}
