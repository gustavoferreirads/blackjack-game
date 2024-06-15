import { Player } from './Player';
import { Card } from './Card';
import { Deck } from './Deck';

export class Dealer extends Player {
  constructor() {
    super(0); // Dealer does not need a balance
  }

  shouldDrawCard(): boolean {
    return this.getScore() < 17;
  }

  play(deck: Deck) {
    while (this.shouldDrawCard()) {
      this.addCard(deck.drawCard() as Card);
    }
  }
}
