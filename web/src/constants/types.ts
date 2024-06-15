export interface GameState {
  playerHand: any[];
  dealerHand: any[];
  playerScore: number;
  dealerScore: number;
  winner?: string;
  playerBalance: number;
  currentBet: number;
}
