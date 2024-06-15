import { BaseError } from './BaseError';

export class MultipleAcesError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'MultipleAcesError';
  }
}
