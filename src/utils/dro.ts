
export interface IResponse<T> {
  data: T,
  error: string | object | [] | null | undefined;
}

/**
 * DATA RESPONSE OBJECT
 */
export class dro {
  static response<T> (data: T): IResponse<T> {
    return ({ data, error: null });
  }

  static error (error: any): IResponse<any> {
    return { data: null, error };
  }
}
