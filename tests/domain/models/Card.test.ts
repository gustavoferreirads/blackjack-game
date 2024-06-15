import { Card } from '../../../src/domain/models/Card';
import { Suit, Rank } from '../../../src/domain/constants';

describe('Card', () => {
  it('should return the correct value for face cards', () => {
    const card = new Card(Suit.Hearts, Rank.King);
    expect(card.getValue()).toBe(10);
  });

  it('should return 11 for an ace', () => {
    const card = new Card(Suit.Spades, Rank.Ace);
    expect(card.getValue()).toBe(11);
  });

  it('should return the correct value for number cards', () => {
    const card = new Card(Suit.Diamonds, Rank.Seven);
    expect(card.getValue()).toBe(7);
  });
});
