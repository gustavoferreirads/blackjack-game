import { Deck } from '../models/Deck';
import { Player } from '../models/Player';
import { Dealer } from '../models/Dealer';
import { Card } from '../models/Card';
import { GameResult } from '../constants';
import { GameOverError } from '../errors/GameOverError';

export class Game {
  private deck: Deck;
  private player: Player;
  private dealer: Dealer;
  private gameResult?: GameResult;

  constructor(initialBalance: number) {
    this.deck = new Deck();
    this.player = new Player(initialBalance);
    this.dealer = new Dealer();
  }

  start(bet: number) {
    this.gameResult = undefined;
    this.deck = new Deck();
    this.player.resetHand();
    this.dealer.resetHand();
    this.player.placeBet(bet);
    this.player.addCard(this.deck.drawCard());
    this.player.addCard(this.deck.drawCard());
    this.dealer.addCard(this.deck.drawCard());
    if (this.player.hasBlackJack()) {
      this.dealerPlay();
    }
  }

  playerHit() {
    if (this.gameResult) throw new GameOverError();

    this.player.addCard(this.deck.drawCard());

    if (this.player.isBusted() || this.player.hasBlackJack()) {
      this.dealerPlay();
    }
  }

  playerDouble() {
    this.player.doubleBet();
    this.playerHit();

    if (!this.player.hasBlackJack() && !this.gameResult) {
      this.dealerPlay();
    }

    if (!this.gameResult) {
      this.determineWinner();
    }
  }

  dealerPlay() {
    if (this.gameResult) {
      return this.determineWinner();
    }

    if (this.player.isBusted() || this.player.hasBlackJack()) {
      this.dealer.addCard(this.deck.drawCard());
      this.determineWinner();
      return;
    }

    const playerScore = this.player.getScore();

    while (
      this.dealer.getScore() < playerScore &&
      (!this.dealer.isBusted() || this.dealer.shouldDrawCard())
    ) {
      this.dealer.addCard(this.deck.drawCard());
    }

    this.determineWinner();
  }

  private determineWinner(): void {
    const playerScore = this.player.getScore();
    const dealerScore = this.dealer.getScore();

    if (this.player.isBusted() && this.dealer.isBusted()) {
      this.player.pushBet();
      this.gameResult = GameResult.BothBusted;
    } else if (this.player.isBusted()) {
      this.player.loseBet();
      this.gameResult = GameResult.DealerWins;
    } else if (this.dealer.isBusted()) {
      this.player.winBet();
      this.gameResult = GameResult.PlayerWins;
    } else if (playerScore > dealerScore) {
      this.player.winBet();
      this.gameResult =
        playerScore === 21 ? GameResult.PlayerBlackjack : GameResult.PlayerWins;
    } else if (dealerScore > playerScore) {
      this.player.loseBet();
      this.gameResult = GameResult.DealerWins;
    } else {
      this.player.pushBet();
      this.gameResult = GameResult.Tie;
    }
  }

  getPlayerHand(): Card[] {
    return this.player.getHand();
  }

  getDealerHand(): Card[] {
    return this.dealer.getHand();
  }

  getPlayerScore(): number {
    return this.player.getScore();
  }

  getDealerScore(): number {
    return this.dealer.getScore();
  }

  getPlayerBalance(): number {
    return this.player.getBalance();
  }

  getCurrentBet(): number {
    return this.player.getCurrentBet();
  }

  getGameResult(): GameResult | undefined {
    return this.gameResult;
  }
}
