import { callMainAPI, getUserManagementAPIEndpoint } from '../utils/call-api';

export interface ICapability {
  read?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
}

export interface ICapabilities {
  adminCenter: ICapability;
}

export interface IRole {
  id: string;
  name: string;
  desc: string;
  capabilities: Record<string, Record<string, any>>;
  tenant: string;
  default?: boolean;
}

class RolesService {
  readonly basePath: string;

  constructor () {
    this.basePath = '/roles';
  }

  getRole (accessToken: string, roleId: string): Promise<IRole> {
    return callMainAPI({
      endpoint: getUserManagementAPIEndpoint(this.basePath + '/' + roleId),
      accessToken
    });
  }
}

// register this service to backend-tenant-management dependency injection container
// so other resources can access this service
export default RolesService;
