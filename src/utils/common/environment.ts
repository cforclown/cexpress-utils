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
  getNodeEnv: (): string => getEnvOrThrow('NODE_ENV'),
  getSessionSecret: (): string => getEnvOrThrow('SESSION_SECRET'),

  getAccessTokenSecret: (): string => getEnvOrThrow('ACCESS_TOKEN_SECRET'),
  getRefreshTokenSecret: (): string => getEnvOrThrow('REFRESH_TOKEN_SECRET'),

  getEncryptionAlgorithm: (): string => process.env.ENCRYPTION_ALGORITHM ? process.env.ENCRYPTION_ALGORITHM : 'aes-256-cbc',
  getEncryptionKey: (): string => process.env.ENCRYPTION_KEY ? process.env.ENCRYPTION_KEY : 'BUTTERDATA_TENANT_MANAGEMENT_ENCRYPTION_KEY'
};
