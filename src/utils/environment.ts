import dotenv from 'dotenv';

dotenv.config();

export function getEnvOrThrow (environmentVariableName: string): string {
  const value = process.env[environmentVariableName];
  if (!value) {
    throw new Error(`Environment variable ${environmentVariableName} not set!`);
  }
  return value;
}

export const Environment = {
  getNodeEnv: (): string => process.env.NODE_ENV ?? 'development',

  getAccessTokenSecret: (): string => getEnvOrThrow('ACCESS_TOKEN_SECRET'),
  getRefreshTokenSecret: (): string => getEnvOrThrow('REFRESH_TOKEN_SECRET'),

  getEncryptionAlgorithm: (): string => getEnvOrThrow('ENCRYPTION_ALGORITHM'),
  getEncryptionKey: (): string => getEnvOrThrow('ENCRYPTION_KEY')
};
