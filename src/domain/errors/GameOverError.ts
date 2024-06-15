import { BaseError } from './BaseError';

export class GameOverError extends BaseError {
  constructor() {
    super('The game is already over, start again');
    this.name = 'GameOverError';
  }
}
