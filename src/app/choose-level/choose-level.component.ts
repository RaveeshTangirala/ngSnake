import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'choose-level',
	templateUrl: './choose-level.component.html',
	styleUrls: ['./choose-level.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseLevelComponent {
	constructor() {}
}
