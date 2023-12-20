import { ELogLevel } from './logger';
import { EnvNames } from './env-config';

export function getEnvOrThrow (varName: string): string {
  const value = process.env[varName];
  if (!value) {
    throw new Error(`Environment variable ${varName} not set!`);
  }
  return value;
}

export function getOptionalEnv <T> (varName: string, defaultValue: T): string | T {
  const value = process.env[varName];
  if (!value) {
    return defaultValue;
  }
  return value;
}

export const Environment = {
  getNodeEnv: (): EnvNames => getEnvOrThrow('NODE_ENV'),
  getLogLevel: (): ELogLevel => {
    const logLevel = getOptionalEnv('LOG_LEVEL', 'prod');

    switch (logLevel) {
      case 'test':
        return ELogLevel.TEST;
      case 'error':
        return ELogLevel.ERROR;
      case 'debug':
        return ELogLevel.DEBUG;
      case 'prod':
        return ELogLevel.PRODUCTION;
      default:
        return ELogLevel.PRODUCTION;
    }
  },
  getPort: (): string => getEnvOrThrow('PORT'),
  getAllowedOrigins: (): string[] => {
    const appHost = getEnvOrThrow('ALLOWED_ORIGINS');
    return appHost.split(',').filter(h => !!h);
  },
  getEncryptionAlgorithm: (): string => getOptionalEnv('ENCRYPTION_ALGORITHM', 'aes-256-cbc'),
  getEncryptionKey: (): string => getEnvOrThrow('ENCRYPTION_KEY')
};
