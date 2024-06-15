import { NextFunction, Request, Response } from 'express';
import { dro } from './dro';
import { HttpStatusCode, RestApiException } from './exceptions';
import { Logger } from './logger';

export function RequestHandler<
  ReqParams = any,
  ReqQuery = any,
  ReqBody = any
> (event: (req: Request<ReqParams, any, ReqBody, ReqQuery>, res: Response, next: NextFunction) => Promise<any>) {
  return async (req: Request<ReqParams, any, ReqBody, ReqQuery>, res: Response, next: NextFunction): Promise<any> => {
    try {
      const data = await event(req, res, next);
      res.send(dro.response(data));
    } catch (err) {
      if (err instanceof RestApiException) {
        return res.status(err.httpCode).send(dro.error(err.message));
      }

      if (err instanceof Error) {
        Logger.exception(err);
        return res.status(HttpStatusCode.InternalServerError).send(dro.error(err.message));
      }

      return res.status(HttpStatusCode.InternalServerError).send(dro.error('Unknown error'));
    }
  };
}
