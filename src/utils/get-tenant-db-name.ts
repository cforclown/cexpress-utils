import { Environment } from '.';

export const getTenantDataDBName = (
  tenantShortName: string
): string => `${Environment.getTenantDataDBNamePrefix()}_${tenantShortName.replaceAll('-', '_')}`;
