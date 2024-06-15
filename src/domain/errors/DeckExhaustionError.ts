import { BaseError } from './BaseError';

export class DeckExhaustionError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'DeckExhaustionError';
  }
}
