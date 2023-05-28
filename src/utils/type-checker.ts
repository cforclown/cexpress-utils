export const isString = (value: any): value is string => typeof value === 'string';

export const isArray = (value: any): value is Array<any> => Array.isArray(value);
