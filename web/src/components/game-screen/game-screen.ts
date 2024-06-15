import { CardRenderer } from '../../modules/card-renderer';
import { ApiUrl } from '../../constants/url';
import { BaseComponent } from '../../modules/base-component';
import { request, formatDollar, getElementById } from '../../modules/util';

export class GameScreen extends BaseComponent {
  cardRenderer = new CardRenderer();
  currentBet!: HTMLElement;
  doubleButton!: HTMLButtonElement;
  dealerDiv!: HTMLElement;
  playerDiv!: HTMLElement;
  dealerScore!: HTMLElement;
  playerScore!: HTMLElement;
  hitButton!: HTMLButtonElement;
  standButton!: HTMLButtonElement;
  balance!: HTMLElement;

  constructor(app: any) {
    super(app, 'game-screen');
  }

  onLoad() {
    this.currentBet = getElementById('current-bet')!;
    this.doubleButton = getElementById('double-button') as HTMLButtonElement;
    this.dealerDiv = getElementById('dealer-hand')!;
    this.playerDiv = getElementById('player-hand')!;
    this.dealerScore = getElementById('dealer-score')!;
    this.playerScore = getElementById('player-score')!;
    this.hitButton = getElementById('hit-button') as HTMLButtonElement;
    this.standButton = getElementById('stand-button') as HTMLButtonElement;
    this.balance = getElementById('bank-balance')!;
    this.hitButton.addEventListener('click', this.playerHit.bind(this));
    this.standButton.addEventListener('click', this.playerStand.bind(this));
    this.doubleButton.addEventListener('click', this.playerDouble.bind(this));
  }

  async render(data: any): Promise<void> {
    await super.render(data);
    this.balance.textContent = formatDollar(data.playerBalance);
    this.currentBet.textContent = `$${data.currentBet}`;
    await this.cardRenderer.renderCards(
      this.dealerDiv as HTMLElement,
      data.dealerHand,
    );
    this.dealerScore.textContent = data.dealerScore;
    await this.cardRenderer.renderCards(
      this.playerDiv as HTMLElement,
      data.playerHand,
    );
    this.playerScore.textContent = data.playerScore;

    if (data.winner) {
      return await this.app.endGame(data.winner);
    }
    this.disableButtons(false);
  }

  async playerHit(): Promise<void> {
    return this._playerAction(ApiUrl.HIT);
  }

  async playerDouble(): Promise<void> {
    return this._playerAction(ApiUrl.DOUBLE);
  }

  async playerStand(): Promise<void> {
    try {
      this.disableButtons(true);
      const data = await request(ApiUrl.STAND).post();
      const { dealerScore, dealerHand } = data;
      await this.cardRenderer.renderCards(
        this.dealerDiv as HTMLElement,
        dealerHand,
      );
      this.dealerScore.textContent = dealerScore;
      await this.app.endGame(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async _playerAction(url: string) {
    try {
      this.disableButtons(true);
      const data = await request(url).post();

      const { playerHand, playerScore, dealerScore, dealerHand, winner } = data;
      await this.cardRenderer.renderCards(
        this.playerDiv as HTMLElement,
        playerHand,
      );
      this.playerScore.textContent = playerScore;

      if (winner) {
        await this.cardRenderer.renderCards(
          this.dealerDiv as HTMLElement,
          dealerHand,
        );
        this.dealerScore.textContent = dealerScore;

        return await this.app.endGame(data);
      }

      this.disableButtons(false);
      this.hideDoubleBtn(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  disableButtons(value: boolean) {
    this.hitButton.disabled = value;
    this.standButton.disabled = value;
    this.doubleButton.disabled = value;
  }

  hideDoubleBtn(data?: any) {
    if (!data || data.currentBet * 2 > data.playerBalance) {
      this.doubleButton.disabled = true;
    }
  }
}
