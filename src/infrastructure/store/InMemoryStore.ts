import { GameState } from '../../domain/types/GameState';
import { GameStorage } from '../interfaces/GameStorage';

export class InMemoryStore implements GameStorage {
  private state: GameState | null = null;

  saveGameState(state: GameState): void {
    this.state = state;
  }

  loadGameState(): GameState | null {
    return this.state;
  }
}
