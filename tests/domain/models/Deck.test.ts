import { Deck } from '../../../src/domain/models/Deck';
import { DeckExhaustionError } from '../../../src/domain/errors/DeckExhaustionError';

describe('Deck', () => {
  it('should initialize with 52 cards', () => {
    const deck = new Deck();
    expect(deck.drawCard()).toBeTruthy();
    expect(deck.drawCard()).toBeTruthy();
  });

  it('should throw an error when the deck is exhausted', () => {
    const deck = new Deck();
    for (let i = 0; i < 52; i++) {
      deck.drawCard();
    }
    expect(() => deck.drawCard()).toThrow(DeckExhaustionError);
  });
});
