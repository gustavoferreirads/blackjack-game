import { StartScreen } from './components/start-screen/start-screen';
import { BetScreen } from './components/bet-screen/bet-screen';
import { GameScreen } from './components/game-screen/game-screen';
import { GameOverScreen } from './components/game-over-screen/game-over-screen';
import { Alert } from './components/alert/alert';
import { request, wait } from './modules/util';
import { ApiUrl } from './constants/url';
import '../styles/global.css';
import { BaseComponent } from './modules/base-component';

export class App {
  startScreen = new StartScreen(this);
  gameScreen = new GameScreen(this);
  betScreen = new BetScreen(this);
  gameOverScreen = new GameOverScreen(this);
  alert = new Alert(this);
  playerBalance = 0;
  appElement: HTMLElement;
  style: HTMLStyleElement;

  constructor() {
    this.appElement = document.getElementById('app') as HTMLElement;
    this.style = document.createElement('style');
    this.onLoad();
  }

  async onLoad() {
    try {
      const data = await request(ApiUrl.BALANCE).get();
      this.playerBalance = data.balance;
      if (this.playerBalance > 0) {
        return await this.showStartScreen();
      }
      await this.showGameOverScreen();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render(component: any) {
    this.appElement.innerHTML = component._html;
  }

  async showStartScreen() {
    await this.startScreen.render();
  }

  async showBetScreen() {
    await this.betScreen.render();
  }

  async showGameScreen(data: any) {
    await this.gameScreen.render(data);
  }

  async showGameOverScreen() {
    await this.gameOverScreen.render();
  }

  async endGame(data: any) {
    await wait(() => {}, 2000);
    await this.alert.show(data.winner);
    await wait(() => this.alert.hide(), 3000);
    this.playerBalance = data.playerBalance;
    if (this.playerBalance > 0) {
      return await this.showBetScreen();
    }
    return await this.showGameOverScreen();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  (window as any).app = new App();
});
