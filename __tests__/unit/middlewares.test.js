import requestHandler from '../../src/middlewares/requestHandler';
import errorHandler from '../../src/middlewares/errorHandler';
import notFoundHandler from '../../src/middlewares/notFoundHandler';

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

describe('Error Handler -> Formatting error data', () => {
  it('When received an error object, expect to define status and data', () => {
    const req = {};
    const res = {};
    res.locals = {};

    const next = jest.fn();

    const error = {
      status: 500,
      message: 'Serviço indisponível. Tente novamente mais tarde.',
    };

    errorHandler(error, req, res, next);

    expect(res.locals.data).toHaveProperty('message');
    expect(res.locals.data.message).toBe('Serviço indisponível. Tente novamente mais tarde.');
    expect(res.locals.status).toBe(500);
    expect(next).toBeCalledTimes(1);
  });
});
describe('Not Found Handler -> Formatting data', () => {
  it('When both response locals.status and locals.data are empty, expect to define 404 and call errorMiddleware', () => {
    const req = {};
    const res = {};
    res.locals = {};

    const next = jest.fn();

    notFoundHandler(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith({
      status: 404,
      message: 'Não foi possível encontrar o recurso solicitado',
    });
  });
});
