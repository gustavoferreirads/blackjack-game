import { ApiUrl } from '../../constants/url';
import { BaseComponent } from '../../modules/base-component';
import { getElementById, formatDollar, request } from '../../modules/util';

export class BetScreen extends BaseComponent {
  allInButton!: HTMLButtonElement;
  dealButton!: HTMLButtonElement;
  betInput!: HTMLInputElement;
  balanceEl!: HTMLSpanElement;

  constructor(app: any) {
    super(app, 'bet-screen');
  }

  onLoad() {
    this.allInButton = getElementById('all-in-button') as HTMLButtonElement;
    this.dealButton = getElementById('deal-button') as HTMLButtonElement;
    this.betInput = getElementById('bet-amount') as HTMLInputElement;
    this.balanceEl = getElementById('bank-balance') as HTMLSpanElement;

    this.allInButton.addEventListener('click', this.handleAllIn.bind(this));
    this.dealButton.addEventListener('click', this.startGame.bind(this));
    this.betInput.addEventListener('change', this.handleChange.bind(this));
    this.betInput.addEventListener('input', this.handleChange.bind(this));

    this.updatePlayerBalance(this.app.playerBalance);
  }

  handleAllIn() {
    if (this.betInput.disabled) {
      this.betInput.disabled = false;
      this.betInput.value = '0';
      this.allInButton.textContent = 'All In';
    } else {
      this.betInput.value = this.app.playerBalance.toString();
      this.betInput.disabled = true;
      this.allInButton.textContent = 'Clear Bet';
    }
    this.handleChange({ target: this.betInput } as unknown as Event);
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^\d.]/g, '');
    const maxAmount = parseFloat(this.app.playerBalance);
    if (parseFloat(value) > maxAmount) {
      value = maxAmount.toString();
      input.value = maxAmount.toString();
    }
    this.updatePlayerBalance(this.app.playerBalance - parseFloat(value));
  }

  updatePlayerBalance(value: number) {
    this.balanceEl.textContent = formatDollar(value);
    this.betInput.max = value.toString();
  }

  startGame() {
    const currentBet = parseInt(this.betInput.value);
    if (
      isNaN(currentBet) ||
      currentBet <= 0 ||
      currentBet > this.app.playerBalance
    ) {
      alert('Invalid bet amount');
      return;
    }

    request(ApiUrl.START, { bet: currentBet })
      .post()
      .then((data: any) => this.app.showGameScreen(data))
      .catch((error: any) => console.error('Error:', error));
  }
}
