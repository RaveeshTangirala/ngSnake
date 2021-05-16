import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'play-again-button',
  templateUrl: './play-again-button.component.html',
  styleUrls: ['./play-again-button.component.scss']
})
export class PlayAgainButtonComponent implements OnInit {
  @Input() buttonText: string = 'Play Again?';
  @Output() buttonClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked(): void {
    this.buttonClickEvent.emit();
  }
}
