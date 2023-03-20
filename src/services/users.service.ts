import { callMainAPI, getUserManagementAPIEndpoint } from '../utils/call-api';

export interface IUser {
  id: string;
  email: string;
  fullname: string;
  password?: string;
  role: string;
  tenant: string;
}

class UsersService {
  readonly basePath: string;

  constructor () {
    this.basePath = '/users';
  }

  getUser (accessToken: string, userId: string): Promise<IUser> {
    return callMainAPI({
      endpoint: getUserManagementAPIEndpoint(this.basePath + '/' + userId),
      accessToken
    });
  }
}

// register this service to backend-tenant-management dependency injection container
// so other resources can access this service
export default UsersService;
