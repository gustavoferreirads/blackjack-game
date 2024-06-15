import { BaseComponent } from '../../modules/base-component';
import { ApiUrl } from '../../constants/url';
import { getElementById, request } from '../../modules/util';

export class GameOverScreen extends BaseComponent {
  restartBtn!: HTMLButtonElement;

  constructor(app: any) {
    super(app, 'game-over-screen');
  }

  async onLoad(): Promise<void> {
    this.restartBtn = getElementById('restart-button') as HTMLButtonElement;
    this.restartBtn.addEventListener('click', this._restartGame.bind(this));
  }

  async _restartGame() {
    this.restartBtn.disabled = true;
    const data = await request(ApiUrl.RESET).post();
    this.restartBtn.disabled = false;
    this.app.playerBalance = data.playerBalance;
    this.app.showBetScreen();
  }
}
