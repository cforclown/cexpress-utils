import { mockRequest, mockResponse } from 'jest-mock-req-res';
import Joi from 'joi';
import { HttpCodes } from './exceptions';
import { dtoValidator } from './joi-dto-validator';

describe('validate-dto', () => {
  const res = mockResponse({});
  const mockNext = { next: (): boolean => true };
  const spyNext = jest.spyOn(mockNext, 'next');

  const mockRequestBodyDto = Joi.object({
    email: Joi.string().email().required(),
    fullname: Joi.string().required(),
    phone: Joi.string()
  });
  const mockParamsDto = Joi.object({
    objectId: Joi.string().required()
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate-body', () => {
    it('should successfully validate body', () => {
      const req = mockRequest({
        body: {
          email: 'email@email.com',
          fullname: 'fullname',
          phone: 'xxxxxxxxxxxx'
        }
      });

      const event = dtoValidator.body(mockRequestBodyDto);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).toHaveBeenCalled();
    });

    it('should send error response with bad request code if required field is not provided', () => {
      const req = mockRequest({
        body: {
          email: 'email@email.com',
          phone: 'xxxxxxxxxxxx'
        }
      });

      const event = dtoValidator.body(mockRequestBodyDto);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status.mock.calls[0][0]).toEqual(HttpCodes.BadRequest);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('validate-params', () => {
    it('should successfully validate params', () => {
      const req = mockRequest({
        params: {
          objectId: 'objectId'
        }
      });

      const event = dtoValidator.params(Joi.object());
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).toHaveBeenCalled();
    });

    it('should send error response with bad request code when validating request params', () => {
      const req = mockRequest({ params: {} });

      const event = dtoValidator.params(mockParamsDto);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status.mock.calls[0][0]).toEqual(HttpCodes.BadRequest);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('validate-query', () => {
    it('should successfully validate query', () => {
      const req = mockRequest({
        query: {
          objectId: 'objectId'
        }
      });

      const event = dtoValidator.query(mockParamsDto);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).toHaveBeenCalled();
    });

    it('should send error response with bad request code when validating request queries', () => {
      const req = mockRequest({ query: {} });

      const event = dtoValidator.query(mockParamsDto);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status.mock.calls[0][0]).toEqual(HttpCodes.BadRequest);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
