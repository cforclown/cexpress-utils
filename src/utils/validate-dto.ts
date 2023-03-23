import { Schema, ValidationOptions } from 'joi';
import { NextFunction, Response } from 'express';
import { dro } from './dro';
import { HttpCodes } from './exceptions';
import { RequestWithUser } from '../types/request';
import { Logger } from './logger';
import { Environment } from './environment';

export function validateDto ({
  source,
  schema,
  validateOptions,
  replaceSource
}: { source: 'body' | 'params' | 'query', schema: Schema, validateOptions?: ValidationOptions, replaceSource?: boolean; }) {
  return (req: RequestWithUser, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[source], validateOptions);
    if (error) {
      const env = Environment.getNodeEnv().toLowerCase();
      if (env === 'test' || env === 'dev' || env === 'development') {
        Logger.danger(error.message);
      }
      res.status(HttpCodes.BadRequest).send(dro.error(error.message));
      return;
    }

    if (replaceSource) {
      req[source] = value;
    }

    return next();
  };
}

export const validateBody = (schema: Schema, validateOptions?: ValidationOptions): (req: RequestWithUser, res: Response, next: NextFunction) => void => validateDto({
  source: 'body',
  schema,
  validateOptions,
  replaceSource: true
});

export const validateParams = (schema: Schema): (req: RequestWithUser, res: Response, next: NextFunction) => void => validateDto({
  source: 'params',
  schema
});

export const validateQuery = (schema: Schema): (req: RequestWithUser, res: Response, next: NextFunction) => void => validateDto({
  source: 'query',
  schema
});
