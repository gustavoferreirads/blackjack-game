import { GameState } from '../domain/types/GameState';
import { GameStorage } from '../infrastructure/interfaces/GameStorage';
import { Game } from '../domain/game/Game';

export class GameApplication {
  private game: Game;
  private storage: GameStorage;
  private readonly initialBalance: number = 1000;

  constructor(storage: GameStorage) {
    this.storage = storage;
    this.game = new Game(this.initialBalance);
  }

  getBalance(): number {
    return this.game.getPlayerBalance();
  }

  startGame(bet: number) {
    this.game.start(bet);
    this.storage.saveGameState(this.getGameState());
  }

  playerHit() {
    this.game.playerHit();
    this.storage.saveGameState(this.getGameState());
  }

  playerDouble() {
    this.game.playerDouble();
    this.storage.saveGameState(this.getGameState());
  }

  playerStand() {
    this.game.dealerPlay();
    this.storage.saveGameState(this.getGameState());
  }

  getGameState(): GameState {
    return {
      playerHand: this.game.getPlayerHand(),
      dealerHand: this.game.getDealerHand(),
      playerScore: this.game.getPlayerScore(),
      dealerScore: this.game.getDealerScore(),
      winner: this.game.getGameResult(),
      playerBalance: this.game.getPlayerBalance(),
      currentBet: this.game.getCurrentBet(),
    };
  }

  resetGame() {
    this.game = new Game(this.initialBalance);
    this.storage.saveGameState(this.getGameState());
  }
}
