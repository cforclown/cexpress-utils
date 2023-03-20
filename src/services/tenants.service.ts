import { callMainAPI, getUserManagementAPIEndpoint } from '../utils/call-api';

export interface ITenant {
  id: string;
  shortName: string;
  name: string;
  profile?: string;
}

class TenantsService {
  readonly basePath: string;

  constructor () {
    this.basePath = '/tenants';
  }

  getTenant (accessToken: string, tenantId: string): Promise<ITenant> {
    return callMainAPI({
      endpoint: getUserManagementAPIEndpoint(this.basePath + '/' + tenantId),
      accessToken
    });
  }
}

// register this service to backend-tenant-management dependency injection container
// so other resources can access this service
export default TenantsService;
