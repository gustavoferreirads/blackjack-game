import { Rank, Suit } from '../constants';

export class Card {
  public readonly name;
  constructor(public suit: Suit, public rank: Rank) {
    this.name = rank + suit;
  }

  getValue(): number {
    if ([Rank.Jack, Rank.Queen, Rank.King].includes(this.rank)) {
      return 10;
    }

    if (this.rank === Rank.Ace) {
      return 11;
    } else {
      return parseInt(this.rank);
    }
  }
  getName() {
    return this.name;
  }
}
