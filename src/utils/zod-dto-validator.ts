import { ZodTypeAny } from 'zod';
import { NextFunction } from 'express';
import { RequestWithUser } from '../types';

interface IZodValidate<T> {
  schema: ZodTypeAny;
  payload: T;
}

export const zodValidate = <T>({ schema, payload }: IZodValidate<T>): T => {
  schema.parse(payload);

  return payload;
};

export const middlewareValidator = (
  schema: ZodTypeAny,
  source: 'body' | 'params' | 'query'
): (re: RequestWithUser, res: Response, next: NextFunction
) => void => (req: RequestWithUser, res: Response, next: NextFunction): void => {
  zodValidate({
    schema,
    payload: req[source]
  });

  return next();
};

export const dtoValidator = {
  body: (schema: ZodTypeAny): (req: RequestWithUser, res: Response, next: NextFunction) => void => middlewareValidator(schema, 'body'),
  params: (schema: ZodTypeAny): (req: RequestWithUser, res: Response, next: NextFunction) => void => middlewareValidator(schema, 'params'),
  query: (schema: ZodTypeAny): (req: RequestWithUser, res: Response, next: NextFunction) => void => middlewareValidator(schema, 'query')
};
