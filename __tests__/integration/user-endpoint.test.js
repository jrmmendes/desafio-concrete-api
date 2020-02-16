import request from 'supertest';
import { matchers } from 'jest-json-schema';
import app from '../../src/app';
import userModel from '../../src/models/user-model';

expect.extend(matchers);

describe('Users -> Sign Up', () => {
  it('When POST to /sign-up has valid payload, expect 201 and response with the created user info', async (done) => {
    const testUserData = {
      nome: 'string',
      email: 'string',
      senha: 'senha',
      telefones: [
        {
          numero: '123456789',
          ddd: '11',
        },
      ],
    };

    const validResponseSchema = {
      properties: {
        _id: { type: 'string' },
        nome: { type: 'string' },
        email: { type: 'string' },
        telefones: {
          type: 'array',
          items: {
            properties: {
              numero: { type: 'string' },
              ddd: { type: 'string' },
            },
          },
        },
        data_criacao: { type: 'string' },
        data_atualizacao: { type: 'string' },
        ultimo_login: { type: 'string' },
        token: { type: 'string' },
      },
      required: [
        'nome',
        'email',
        'telefones',
        '_id',
        'data_criacao',
        'data_atualizacao',
        'ultimo_login',
      ],
    };

    const response = await request(app)
      .post('/sign-up')
      .send(testUserData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchSchema(validResponseSchema);
    await userModel.findByIdAndRemove(response.body.id);
    done();
  });

  it('When already registered email, expect 400 and error message', async (done) => {
    const testUserData = {
      nome: 'string',
      email: 'string',
      senha: 'senha',
      telefones: [
        {
          numero: '123456789',
          ddd: '11',
        },
      ],
    };

    await request(app)
      .post('/users/sign-up')
      .send(testUserData);

    const response = await request(app)
      .post('/users/sign-up')
      .send(testUserData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('E-mail já existente');
    done();
  });
});

describe('Users Endpoint -> Sign In', () => {
  it('When valid email and password on request body, expect 200 and valid response body', async (done) => {
    const testUserData = {
      nome: 'Johnny Test',
      email: 'johnny@mail.com',
      senha: 'mypass',
      telefones: [
        {
          numero: '123456789',
          ddd: '11',
        },
      ],
    };

    const validLoginCredentials = {
      email: 'johnny@mail.com',
      senha: 'mypass',
    };

    const validResponseSchema = {
      properties: {
        nome: { type: 'string' },
        email: { type: 'string' },
        telefones: {
          type: 'array',
          items: {
            properties: {
              numero: { type: 'string' },
              ddd: { type: 'string' },
            },
          },
        },
        _id: { type: 'string' },
        data_criacao: { type: 'string' },
        data_atualizacao: { type: 'string' },
        ultimo_login: { type: 'string' },
        token: { type: 'string' },
      },
      required: [
        'nome',
        'email',
        'telefones',
        '_id',
        'data_criacao',
        'data_atualizacao',
        'ultimo_login',
        'token',
      ],
    };

    await request(app)
      .post('/sign-up')
      .send(testUserData);

    const response = await request(app)
      .post('/sign-in')
      .send(validLoginCredentials);

    expect(response.status).toBe(200);
    expect(response.body).toMatchSchema(validResponseSchema);
    done();
  });

  it('When invalid email, expect 401 and error message', async (done) => {
    const invalidLoginCredentials = {
      email: 'johnny@othermail.com',
      senha: 'mypass',
    };

    const response = await request(app)
      .post('/users/sign-in')
      .send(invalidLoginCredentials);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Usuário e/ou senha inválidos');
    done();
  });

  it('When invalid password, expect 401 and error message', async (done) => {
    const testUserData = {
      nome: 'Johnny Test',
      email: 'johnny@mail.com',
      senha: 'mypass',
      telefones: [
        {
          numero: '123456789',
          ddd: '11',
        },
      ],
    };

    await request(app)
      .post('/sign-up')
      .send(testUserData);

    const invalidLoginCredentials = {
      email: 'johnny@mail.com',
      senha: 'mywrongpass',
    };

    const response = await request(app)
      .post('/sign-in')
      .send(invalidLoginCredentials);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Usuário e/ou senha inválidos');
    done();
  });
});
