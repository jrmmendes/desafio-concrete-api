import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import model from '../../src/models/user-model';
import initConnection from '../../src/config/database';

describe(' User Endpoint -> Searching users', () => {
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

  it('When invalid token on Authorization Header, expect 401 with message', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
  });
});
