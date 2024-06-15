import { GameApplication } from '../../src/application/GameApplication';
import { InMemoryStore } from '../../src/infrastructure/store/InMemoryStore';
import { GameState } from '../../src/domain/types/GameState';
import { GameResult } from '../../src/domain/constants';

describe('Game', () => {
  let gameApp: GameApplication;
  let store: InMemoryStore;

  const startGame = (gameApp: GameApplication) => {
    gameApp.startGame(100);
    const { winner } = gameApp.getGameState();
    if (winner) {
      expect(winner).toBe(GameResult.PlayerBlackjack);
      gameApp.resetGame();
      gameApp.startGame(100);
      startGame(gameApp);
    }
  };

  beforeEach(() => {
    store = new InMemoryStore();
    gameApp = new GameApplication(store);
    gameApp.resetGame();
    startGame(gameApp);
  });

  it('should start the game and save the state', () => {
    const state = store.loadGameState() as GameState;
    expect(state.playerHand.length).toBe(2);
    expect(state.dealerHand.length).toBe(1);
    expect(state.playerBalance).toBe(900);
  });

  it('should allow the player to hit and save the state', () => {
    gameApp.playerHit();
    const state = store.loadGameState() as GameState;
    expect(state.playerHand.length).toBe(3);
  });

  it('should declare the correct winner and save the state', () => {
    gameApp.playerHit();
    gameApp.playerStand();
    const state = store.loadGameState() as GameState;
    expect([
      GameResult.DealerWins,
      GameResult.PlayerWins,
      GameResult.BothBusted,
      GameResult.Tie,
    ]).toContain(state.winner);
  });

  it('should reset game and save the state', () => {
    gameApp.resetGame();
    const state = store.loadGameState() as GameState;
    expect(state.playerHand.length).toBe(0);
    expect(state.dealerHand.length).toBe(0);
    expect(state.playerBalance).toBe(1000);
  });
});
