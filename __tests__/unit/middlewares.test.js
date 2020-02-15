import requestHandler from '../../src/middlewares/requestHandler';

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
