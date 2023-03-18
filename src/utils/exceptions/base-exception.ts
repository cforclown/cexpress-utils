import { Environment } from '../environment';
import { Logger, LogLevel } from '../logger';

export interface IException {
  code: string;
  name: string;
  level: LogLevel;
}

export abstract class BaseException extends Error {
  constructor (exception: IException, message?: string) {
    super(message);
    this.name = `[${exception.code}] ${exception.name}`;

    if (Environment.getNodeEnv() === 'test') {
      return;
    }
    Logger[exception.level](`${this.name}: ${this.message}`);
  }
}

export const EXCEPTIONS: { [key: string]: IException; } = {
  VALIDATION_EXCEPTION: {
    level: 'error',
    code: 'EVE001',
    name: 'Validation Exception'
  },
  REST_API_EXCEPTION: {
    level: 'error',
    code: 'ERAE',
    name: 'Rest API Exception'
  }
};
