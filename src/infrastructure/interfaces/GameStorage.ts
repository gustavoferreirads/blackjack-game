import { GameState } from '../../domain/types/GameState';

export interface GameStorage {
  saveGameState(state: GameState): void;
  loadGameState(): GameState | null;
}
