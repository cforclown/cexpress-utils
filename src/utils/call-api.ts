// eslint-disable-next-line import/named
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpCodes, RestApiException } from './exceptions';

export type APIEndpointMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS'

export interface IAxiosFetchArgs {
  url: string;
  body?: any;
  config?: AxiosRequestConfig;
}
export const AxiosFetch = {
  GET: (args: IAxiosFetchArgs): Promise<any> => axios.get(args.url, args.config),
  POST: (args: IAxiosFetchArgs): Promise<any> => axios.post(args.url, args.body, args.config),
  PUT: (args: IAxiosFetchArgs): Promise<any> => axios.put(args.url, args.body, args.config),
  PATCH: (args: IAxiosFetchArgs): Promise<any> => axios.patch(args.url, args.body, args.config),
  DELETE: (args: IAxiosFetchArgs): Promise<any> => axios.delete(args.url, args.config),
  OPTIONS: (args: IAxiosFetchArgs): Promise<any> => axios.options(args.url, args.config)
};

export interface IAPIEndpoint {
  url: string;
  method?: APIEndpointMethods;
  headers?: Record<string, any>;
}

export const axiosFetch = (endpoint: IAPIEndpoint, body: any): Promise<AxiosResponse<any, any>> => {
  const config = endpoint.headers ? { headers: endpoint.headers } : undefined;
  return AxiosFetch[endpoint.method ?? 'GET']({
    url: endpoint.url,
    body,
    config
  });
};

export const axiosFetchHandler = async (endpoint: IAPIEndpoint, body?: any): Promise<any> => {
  try {
    const response = await axiosFetch(endpoint, body);
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
