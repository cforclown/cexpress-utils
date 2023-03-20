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

  getUserManagementHostname: (): string => getEnvOrThrow('USER_MANAGEMENT_HOSTNAME'),

  getTenantDataDBUri: (): string => getEnvOrThrow('TENANT_DATA_DB_URI'),
  getTenantDataDBNamePrefix: (): string => getEnvOrThrow('TENANT_DATA_DB_NAME_PREFIX'),

  getSessionSecret: (): string => getEnvOrThrow('SESSION_SECRET'),

  getAccessTokenSecret: (): string => getEnvOrThrow('ACCESS_TOKEN_SECRET'),
  getRefreshTokenSecret: (): string => getEnvOrThrow('REFRESH_TOKEN_SECRET'),

  getEncryptionAlgorithm: (): string => getEnvOrThrow('ENCRYPTION_ALGORITHM'),
  getEncryptionKey: (): string => getEnvOrThrow('ENCRYPTION_KEY')
};
