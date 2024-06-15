import { InMemoryStore } from '../../../src/infrastructure/store/InMemoryStore';
import { GameState } from '../../../src/domain/types/GameState';

describe('InMemoryStore', () => {
  let store: InMemoryStore;

  beforeEach(() => {
    store = new InMemoryStore();
  });

  it('should save and load the game state', () => {
    const state: GameState = {
      playerHand: [],
      dealerHand: [],
      playerScore: 0,
      dealerScore: 0,
      winner: undefined,
      playerBalance: 1000,
      currentBet: 0,
    };

    store.saveGameState(state);
    const loadedState = store.loadGameState();
    expect(loadedState).toEqual(state);
  });
});
