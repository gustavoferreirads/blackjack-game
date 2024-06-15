import { Player } from '../../../src/domain/models/Player';
import {Card} from "../../../src/domain/models/Card";
import {Rank, Suit} from "../../../src/domain/constants";

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player(1000);
  });

  it('should correctly calculate the score', () => {
    player.addCard(new Card(Suit.Hearts, Rank.Five));
    player.addCard(new Card(Suit.Diamonds, Rank.Nine));
    expect(player.getScore()).toBe(14);
  });

  it('should handle multiple aces correctly', () => {
    player.addCard(new Card(Suit.Spades, Rank.Ace));
    player.addCard(new Card(Suit.Clubs, Rank.Ace));
    player.addCard(new Card(Suit.Hearts, Rank.Nine));
    expect(player.getScore()).toBe(21);
  });

  it('should return true if the player is busted', () => {
    player.addCard(new Card(Suit.Hearts, Rank.Ten));
    player.addCard(new Card(Suit.Diamonds, Rank.Ten));
    player.addCard(new Card(Suit.Clubs, Rank.Five));
    expect(player.isBusted()).toBe(true);
  });

  it('should handle betting correctly', () => {
    player.placeBet(100);
    expect(player.getBalance()).toBe(900);
    expect(player.getCurrentBet()).toBe(100);

    player.winBet();
    expect(player.getBalance()).toBe(1100);

    player.placeBet(200);
    player.loseBet();
    expect(player.getBalance()).toBe(900);
  });

  it('should handle doubling bet correctly', () => {
    player.placeBet(100);
    player.doubleBet();
    expect(player.getCurrentBet()).toBe(200);
    expect(player.getBalance()).toBe(800);
  });

  it('should reset balance correctly', () => {
    player.placeBet(100);
    player.resetBalance(1000);
    expect(player.getBalance()).toBe(1000);
  });
});
