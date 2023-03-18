import { NextFunction, Response } from 'express';
import { dro } from './dro';
import { HttpCodes, RestApiException } from './exceptions';
import { ErrorLogger } from './common';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { RequestWithUser } from '../types/request';

export function RequestHandler (event: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<any>) {
  return async (req: RequestWithUser, res: Response, next: NextFunction): Promise<any> => {
    try {
      const data = await event(req, res, next);
      res.send(dro.response(data));
    } catch (err) {
      if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError || err instanceof NotBeforeError) {
        return res.status(HttpCodes.Unauthorized).send(dro.error(err.message));
      }

      if (err instanceof RestApiException) {
        return res.status(err.httpCode).send(dro.error(err.message));
      }

      if (err instanceof Error) {
        ErrorLogger(err);
        return res.status(HttpCodes.Internal).send(dro.error(err.message));
      } else {
        return res.status(HttpCodes.Internal).send(dro.error('Unknown error'));
      }
    }
  };
}
