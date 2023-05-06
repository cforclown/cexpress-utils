export type ResponseCode = 'OK' | 'NOT_FOUND' | 'BAD_REQUEST' | 'FORBIDDEN' | 'UNAUTHORIZED'

export interface IResponse<T> {
  data: T,
  error: string | object | [] | null | undefined;
  code?: ResponseCode
}

/**
 * DATA RESPONSE OBJECT
 */
export class dro {
  static response<T> (data: T): IResponse<T> {
    return ({ data, error: null, code: 'OK' });
  }

  static error (error: any, code?: ResponseCode): IResponse<any> {
    return { data: null, error, code: code ?? 'BAD_REQUEST' };
  }
}
