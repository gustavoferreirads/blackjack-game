import { BaseComponent } from '../../modules/base-component';
import { getElementById } from '../../modules/util';

export class StartScreen extends BaseComponent {
  startButton!: HTMLButtonElement;

  constructor(app: any) {
    super(app, 'start-screen');
  }

  onLoad() {
    this.startButton = getElementById('start-button') as HTMLButtonElement;
    this.startButton.addEventListener('click', () => this.app.showBetScreen());
  }
}
