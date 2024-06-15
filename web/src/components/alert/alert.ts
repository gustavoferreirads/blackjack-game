import { DEALER_WINS, PLAYER_WINS, RESULT_LABEL } from '../../constants/result';
import { BaseComponent } from '../../modules/base-component';
import { getElementById } from '../../modules/util';

type WinnerType = keyof typeof RESULT_LABEL;

export class Alert extends BaseComponent {
  constructor(app: any) {
    super(app, 'alert');
  }
  onLoad() {
    this.app.appElement.innerHTML += this._html;
  }

  async show(winner: WinnerType) {
    await this.onMount();
    this.onLoad();

    const alertElement = getElementById('alert-screen');

    if (PLAYER_WINS.includes(winner)) {
      alertElement
        ?.querySelector('#blue-ribbon-svg')
        ?.classList.remove('hidden');
    } else if (winner === DEALER_WINS) {
      alertElement
        ?.querySelector('#red-ribbon-svg')
        ?.classList.remove('hidden');
    } else {
      alertElement
        ?.querySelector('#black-ribbon-svg')
        ?.classList.remove('hidden');
    }

    const messageElement = alertElement?.querySelector('#alert-message');
    if (messageElement) {
      messageElement.textContent = RESULT_LABEL[winner] || RESULT_LABEL.TIE;
    }

    requestAnimationFrame(() => {
      setTimeout(() => {
        if (alertElement) {
          alertElement.style.opacity = '1';
        }
      }, 100);
    });
  }

  hide() {
    const alertElement = getElementById('alert-screen');
    if (alertElement) {
      alertElement.remove();
    }
  }
}
