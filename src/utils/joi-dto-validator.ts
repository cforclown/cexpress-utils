import { Schema, ValidationOptions } from 'joi';
import { NextFunction, Response } from 'express';
import { dro } from './dro';
import { HttpCodes } from './exceptions';
import { RequestWithUser } from '../types/request';
import { Logger } from './logger';
import { Environment } from './environment';

export function middlewareValidator (
  schema: Schema,
  source: 'body' | 'params' | 'query',
  validateOptions?: ValidationOptions
) {
  return (req: RequestWithUser, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[source], validateOptions);
    if (error) {
      const env = Environment.getNodeEnv().toLowerCase();
      if (env === 'test' || env === 'dev' || env === 'development') {
        Logger.danger(error.message);
      }
      res.status(HttpCodes.BadRequest).send(dro.error(error.message));
      return;
    }

    return next();
  };
}

export const dtoValidator = {
  body: (
    schema: Schema,
    validateOptions?: ValidationOptions
  ): (req: RequestWithUser, res: Response, next: NextFunction
) => void => middlewareValidator(schema, 'body', validateOptions),
  params: (
    schema: Schema,
    validateOptions?: ValidationOptions
  ): (req: RequestWithUser, res: Response, next: NextFunction
) => void => middlewareValidator(schema, 'params', validateOptions),
  query: (
    schema: Schema,
    validateOptions?: ValidationOptions
  ): (req: RequestWithUser, res: Response, next: NextFunction
) => void => middlewareValidator(schema, 'query', validateOptions)
};
