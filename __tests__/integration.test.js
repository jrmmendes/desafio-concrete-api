import request from 'supertest';
import { matchers } from 'jest-json-schema';
import app from '../src/app';

expect.extend(matchers);

describe('Users Endpoint -> Sign Up', () => {
  it('When valid user data, expect 201 and response body', async (done) => {
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
        nome: { type: 'string' },
        email: { type: 'string' },
        senha: { type: 'string' },
        telefones: {
          type: 'array',
          items: {
            properties: {
              numero: { type: 'string' },
              ddd: { type: 'string' },
            },
          },
        },
        id: { type: 'string' },
        data_criacao: { type: 'string' },
        data_atualizacao: { type: 'string' },
        ultimo_login: { type: 'string' },
        token: { type: 'string' },
      },
      required: [
        'nome',
        'email',
        'senha',
        'telefones',
        'id',
        'data_criacao',
        'data_atualizacao',
        'ultimo_login',
        'token',
      ],
    };

    const response = await request(app)
      .post('/users/sign-up')
      .send(testUserData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchSchema(validResponseSchema);
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
        senha: { type: 'string' },
        telefones: {
          type: 'array',
          items: {
            properties: {
              numero: { type: 'string' },
              ddd: { type: 'string' },
            },
          },
        },
        id: { type: 'string' },
        data_criacao: { type: 'string' },
        data_atualizacao: { type: 'string' },
        ultimo_login: { type: 'string' },
        token: { type: 'string' },
      },
      required: [
        'nome',
        'email',
        'senha',
        'telefones',
        'id',
        'data_criacao',
        'data_atualizacao',
        'ultimo_login',
        'token',
      ],
    };

    await request(app)
      .post('/users/sign-up')
      .send(testUserData);

    const response = await request(app)
      .post('/users/sign-in')
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
      .post('/users/sign-up')
      .send(testUserData);

    const invalidLoginCredentials = {
      email: 'johnny@mail.com',
      senha: 'mywrongpass',
    };

    const response = await request(app)
      .post('/users/sign-in')
      .send(invalidLoginCredentials);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Usuário e/ou senha inválidos');
    done();
  });
});
