import { Rank, Suit } from '../constants';
import { DeckExhaustionError } from '../errors/DeckExhaustionError';
import { Card } from './Card';

export class Deck {
  private suits = Object.values(Suit);
  private ranks = Object.values(Rank);
  private cards: Card[] = [];

  constructor() {
    this.initializeDeck();
    this.shuffle();
  }

  private initializeDeck() {
    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  private shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawCard(): Card {
    if (this.cards.length === 0) {
      throw new DeckExhaustionError('The deck is exhausted');
    }
    return this.cards.pop() as Card;
  }

  reset() {
    this.cards = [];
    this.initializeDeck();
    this.shuffle();
  }
}
