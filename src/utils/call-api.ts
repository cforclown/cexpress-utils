// eslint-disable-next-line import/named
import axios, { AxiosResponse } from 'axios';
import { Environment } from './environment';
import { HttpCodes, RestApiException } from './exceptions';

export type IAPIEndpointMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS'

export interface IAPIEndpoint {
  url: string;
  method?: IAPIEndpointMethod;
  headers?: Record<string, any>;
}

export const getUserManagementAPIEndpoint = (path: string, method?: IAPIEndpointMethod, headers?: Record<string, any>): IAPIEndpoint => ({
  url: `${Environment.getUserManagementHostname()}/api` + path,
  method,
  headers
});

export const getAuthEndpoint = (path: string, method?: IAPIEndpointMethod, headers?: Record<string, any>): IAPIEndpoint => ({
  url: `${Environment.getUserManagementHostname()}/auth` + path,
  method,
  headers
});

export const axiosFetcher = (endpoint: IAPIEndpoint, body: any): Promise<AxiosResponse<any, any>> => {
  let callback;
  switch (endpoint.method) {
    case 'GET':
      callback = axios.get(endpoint.url, endpoint.headers ? { headers: endpoint.headers } : undefined);
      break;
    case 'POST':
      callback = axios.post(endpoint.url, body, endpoint.headers ? { headers: endpoint.headers } : undefined);
      break;
    case 'PUT':
      callback = axios.put(endpoint.url, body, endpoint.headers ? { headers: endpoint.headers } : undefined);
      break;
    case 'PATCH':
      callback = axios.patch(endpoint.url, body, endpoint.headers ? { headers: endpoint.headers } : undefined);
      break;
    case 'DELETE':
      callback = axios.delete(endpoint.url, endpoint.headers ? { headers: endpoint.headers } : undefined);
      break;
    default:
      callback = axios.get(endpoint.url, endpoint.headers ? { headers: endpoint.headers } : undefined);
      break;
  }
  return callback;
};

export const axiosFetchHandler = async (endpoint: IAPIEndpoint, body?: any): Promise<any> => {
  try {
    const response = await axiosFetcher(endpoint, body);
    return response.data;
  } catch (err: any) {
    // Request made and server responded
    if (err.response) {
      const { error } = err.response.data;
      throw new RestApiException(error, err.response.status);
    }

    // The request was made but no response was received
    if (err.request) {
      throw new RestApiException('Server is not responding', HttpCodes.BadGateway);
    }
    // Something happened in setting up the request that triggered an Error
    throw err;
  }
};

export const callApi = async (endpoint: IAPIEndpoint, body?: any, fetchHandler?: (endpoint: IAPIEndpoint, body?: any) => Promise<any>): Promise<any> => {
  const data = fetchHandler ? await fetchHandler(endpoint, body) : await axiosFetchHandler(endpoint, body);
  return data;
};

export interface ICallMainAPI {
  endpoint: IAPIEndpoint;
  body?: any;
  accessToken?: string;
}
export const callMainAPI = async <T>({
  endpoint,
  body,
  accessToken
}: ICallMainAPI): Promise<T> => {
  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    endpoint.headers = Object.assign(endpoint.headers ?? {}, {
      Authorization: `Bearer ${accessToken}`
    });
  }

  const { data: responseBody, error } = await callApi(endpoint, body);
  if (error) {
    throw new Error(error);
  }

  return responseBody as T;
};
