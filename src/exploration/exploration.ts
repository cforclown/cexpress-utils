import Joi from 'joi';
import { IPaginationReq, IPaginationRes, PaginationReqSchema, paginationSwagger } from './pagination';

export interface IExplorationReq {
  query?: string;
  pagination: IPaginationReq;
}

export const ExplorationReqSchema = Joi.object<IExplorationReq>({
  query: Joi.string().allow(null, '').default(null),
  pagination: PaginationReqSchema.required()
});

export interface IExplorationRes<T> {
  data: T[];
  exploration: IExplorationReq & {
    pagination: IPaginationRes,
  };
}

export const explorationSwaggerSchemas = {
  explorationPayload: {
    query: { type: 'string' },
    pagination: { ...paginationSwagger }
  }
};
