import request from 'supertest';
import { matchers } from 'jest-json-schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import app from '../../src/app';
import initConnection from '../../src/config/database';

expect.extend(matchers);

describe('Users Endpoint -> Sign In', () => {
  beforeAll(async (done) => {
    const mongod = new MongoMemoryServer();
    const connectionString = await mongod.getConnectionString();
    initConnection(connectionString);
    done();
  });

  beforeEach(async (done) => {
    await mongoose
      .connection
      .collection('users')
      .deleteMany({});
    done();
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

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
