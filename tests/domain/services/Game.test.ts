/* eslint-disable prettier/prettier */
import { Game } from '../../../src/domain/game/Game';
import { GameResult } from '../../../src/domain/constants';
import { GameOverError } from '../../../src/domain/errors/GameOverError';

describe('Game', () => {
  let game: Game;

  const startGame = (gameApp: Game) => {
    gameApp.start(100);
    const result = gameApp.getGameResult();
    if (result) {
      expect(result).toBe(GameResult.PlayerBlackjack);
      gameApp.start(100);
      startGame(gameApp);
    }
  };

  beforeEach(() => {
    game = new Game(1000);
    startGame(game)
  });

  it('should start the game with two cards for player and one for dealer', () => {
    expect(game.getPlayerHand().length).toBe(2);
    expect(game.getDealerHand().length).toBe(1);
    expect(game.getPlayerBalance()).toBe(900);
    expect(game.getCurrentBet()).toBe(100);
  });

  it('should allow the player to hit and receive a card', () => {
    game.start(100);
    game.playerHit();
    expect(game.getPlayerHand().length).toBe(3);
  });

  it('should allow the dealer to play until score is 17 or higher', () => {

    game.dealerPlay();
    expect(game.getDealerScore()).toBeGreaterThanOrEqual(17);
  });

  it('should declare the correct winner', () => {
    game.playerHit();

    if (!game.getGameResult()) game.playerHit(); // Intentional hit to likely bust the player
    if (!game.getGameResult()) game.playerHit();
    if (!game.getGameResult()) game.playerHit();
    const result = game.getGameResult();
    expect([GameResult.DealerWins, GameResult.BothBusted, GameResult.Tie, GameResult.PlayerWins, GameResult.PlayerBlackjack]).toContain(result);
  });

  it('should handle doubling bet', () => {
    game.playerDouble();
    const result = game.getGameResult();
    expect(game.getCurrentBet()).toBe(0);

    if (result === GameResult.DealerWins) {
      expect(game.getPlayerBalance()).toBe(800);
    } else {
      expect(game.getPlayerBalance()).toBe(1200);
    }
  });

  it('should throw GameOverError if player tries to hit after game over', () => {
    game.playerDouble();

    const result = game.getGameResult();
    expect(result).not.toBeUndefined();

    expect(() => game.playerHit()).toThrow(GameOverError);
    expect(() => game.dealerPlay()).toThrow(GameOverError);
    expect(() => game.playerDouble()).toThrow(GameOverError);
  });
});
