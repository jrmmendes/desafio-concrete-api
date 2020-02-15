import requestHandler from '../../src/middlewares/requestHandler';
import errorHandler from '../../src/middlewares/errorHandler';

describe('Request Handler -> Sending Responses ', () => {
  it('When the response has defined locals.status, expect res.status method to be called', () => {
    const res = {};
    const req = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.locals = { status: 400 };

    requestHandler(req, res);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
  });

  it('When the response has defined locals.data, expect res.json method to be called', () => {
    const testData = {
      nome: 'Junior',
      email: 'jrmmendes@outlook.com',
    };

    const res = {};
    const req = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.locals = {
      data: testData,
    };

    requestHandler(req, res);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(testData);
  });
});

describe('Error Middleware -> Formatting error data', () => {
  it('When received an error object, expect to define status and data', () => {
    const req = {};
    const res = {};
    res.locals = {};

    const next = jest.fn();

    const error = {
      status: 500,
      message: 'This service is not avaliable. Try again latter',
    };

    errorHandler(error, req, res, next);

    expect(res.locals.data).toHaveProperty('message');
    expect(res.locals.data.message).toBe('This service is not avaliable. Try again latter');
    expect(res.locals.status).toBe(500);
    expect(next).toBeCalledTimes(1);
  });
});
