import { HttpStatusCode } from 'axios';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { validateBody, validateParams, validateQuery } from './validate-dto';
import Joi from 'joi';

describe('validate-dto', () => {
  const res = mockResponse({});
  const mockNext = { next: (): boolean => true };
  const spyNext = jest.spyOn(mockNext, 'next');

  const mockSchema1 = Joi.object({
    id: Joi.string().required()
  });
  const mockSchema2 = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate-body', () => {
    it('should successfully validate body', () => {
      const req = mockRequest({
        body: {
          username: 'username',
          password: 'password'
        }
      });

      const event = validateBody(mockSchema2);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).toHaveBeenCalled();
    });

    it('should send error response with bad request code', () => {
      const req = mockRequest({
        body: {
          username: null,
          password: 'password'
        }
      });

      const event = validateBody(mockSchema2);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status.mock.calls[0][0]).toEqual(HttpStatusCode.BadRequest);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('validate-params', () => {
    it('should successfully validate params', () => {
      const req = mockRequest({
        params: {
          id: 'object-id'
        }
      });

      const event = validateParams(mockSchema1);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).toHaveBeenCalled();
    });

    it('should send error response with bad request code when validating request params', () => {
      const req = mockRequest({ params: {} });

      const event = validateParams(mockSchema1);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status.mock.calls[0][0]).toEqual(HttpStatusCode.BadRequest);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('validate-query', () => {
    it('should successfully validate query', () => {
      const req = mockRequest({
        query: {
          id: 'object-id'
        }
      });

      const event = validateQuery(mockSchema1);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).toHaveBeenCalled();
    });

    it('should send error response with bad request code when validating request queries', () => {
      const req = mockRequest({ query: {} });

      const event = validateQuery(mockSchema1);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status.mock.calls[0][0]).toEqual(HttpStatusCode.BadRequest);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
