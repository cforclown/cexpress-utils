import { NextFunction, Response } from 'express';
import { dro } from './dro';
import { HttpCodes } from './exceptions';
import { ErrorLogger } from './error-logger';
import { RequestWithUser } from '../types/request';

export function checkAuthorization (resourceType: string, action: string, forbiddenMsg = `You don't have the authority to '${action}' on resource '${resourceType}'`) {
  return (req: RequestWithUser, res: Response, next: NextFunction): any => {
    try {
      if (!req.user) {
        return res.status(HttpCodes.Unauthorized).send(dro.error('UNAUTHORIZED'));
      }

      return next();
    } catch (err) {
      if (err instanceof Error) {
        ErrorLogger(err);
      }
      return res.status(HttpCodes.Forbidden).send(dro.error(forbiddenMsg));
    }
  };
}
