import { matchers } from 'jest-json-schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import model from '../../src/models/user-model';
import initConnection from '../../src/config/database';

expect.extend(matchers);

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
    'token',
  ],
};

describe('Users -> Sign Up', () => {
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

  it('When POST to /sign-up has valid payload, expect 201 and response with the created user info', async (done) => {
    const testUserData = {
      nome: 'Luke',
      email: 'luke@skywalker.com',
      senha: 'lightside',
      telefones: [
        {
          numero: '9999-0000',
          ddd: '22',
        },
      ],
    };
    const response = await request(app)
      .post('/sign-up')
      .send(testUserData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchSchema(validResponseSchema);
    done();
  });

  it('When already registered email, expect 400 and error message', async (done) => {
    const testUserData = {
      nome: 'Anakin',
      email: 'anakin@skywalker.com',
      senha: 'darkside',
      telefones: [
        {
          numero: '9999-0000',
          ddd: '22',
        },
      ],
    };

    const resp1 = await request(app)
      .post('/sign-up')
      .send(testUserData);

    const response = await request(app)
      .post('/sign-up')
      .send(testUserData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('E-mail já existente');

    const { _id: userId } = resp1.body;
    await model.findByIdAndRemove(userId);

    done();
  });
});
