import { Card } from '../models/Card';
import { GameResult } from '../constants';

export interface GameState {
  playerHand: Card[];
  dealerHand: Card[];
  playerScore: number;
  dealerScore: number;
  winner?: GameResult;
  playerBalance: number;
  currentBet: number;
}
