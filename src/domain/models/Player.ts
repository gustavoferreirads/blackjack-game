import { Card } from './Card';
import { Rank } from '../constants';
import { InsufficientDoubleBalanceError } from '../errors/InsufficientDoubleBalanceError';

export class Player {
  private hand: Card[] = [];
  private balance: number;
  private currentBet = 0;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  addCard(card: Card) {
    this.hand.push(card);
  }

  getHand(): Card[] {
    return this.hand;
  }

  getScore(): number {
    let score = 0;
    let aceCount = 0;

    for (const card of this.hand) {
      score += card.getValue();
      if (card.rank === Rank.Ace) {
        aceCount++;
      }
    }

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }

    return score;
  }

  isBusted(): boolean {
    return this.getScore() > 21;
  }

  hasBlackJack(): boolean {
    return this.getScore() === 21;
  }

  resetHand() {
    this.hand = [];
  }

  getBalance(): number {
    return this.balance;
  }

  placeBet(amount: number) {
    if (amount > this.balance) {
      throw new InsufficientDoubleBalanceError('Insufficient balance');
    }
    this.currentBet = amount;
    this.balance -= amount;
  }

  getCurrentBet(): number {
    return this.currentBet;
  }

  winBet() {
    this.balance += this.currentBet * 2;
    this.currentBet = 0;
  }

  loseBet() {
    this.currentBet = 0;
  }

  pushBet() {
    this.balance += this.currentBet;
    this.currentBet = 0;
  }

  doubleBet() {
    if (this.currentBet > this.balance) {
      throw new InsufficientDoubleBalanceError(
        'Insufficient balance for doubling',
      );
    }
    this.balance -= this.currentBet;
    this.currentBet *= 2;
  }

  resetBalance(initialBalance: number) {
    this.balance = initialBalance;
  }
}
