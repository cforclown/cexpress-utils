import { BaseException, EXCEPTIONS } from '.';

export class ValidationException extends BaseException {
  constructor (message?: string) {
    super(EXCEPTIONS.VALIDATION_EXCEPTION, message);
  }
}
