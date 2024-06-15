import { BaseError } from './BaseError';

export class InsufficientDoubleBalanceError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'InsufficientDoubleBalanceError';
  }
}
