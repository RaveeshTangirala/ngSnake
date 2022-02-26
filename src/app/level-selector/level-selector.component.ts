import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'level-selector',
	templateUrl: './level-selector.component.html',
	styleUrls: ['./level-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelSelectorComponent {
	constructor() {}
}
