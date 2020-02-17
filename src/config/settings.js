import convict from 'convict';

export default convict({
  env: {
    docs: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  security: {
    tokenExpirationTime: {
      docs: 'The expiration time for jwt tokens, expressed in seconds or a string describing a time span zeit/ms',
      format: String,
      default: '30m',
      env: 'TOKEN_EXPIRATION_TIME',
    },
    appSecret: {
      docs: 'The application secret usend on authentication methods',
      format: String,
      default: 'developmentsecret',
      env: 'APPLICATION_SECRET',
    },
  },
  db: {
    connectionString: {
      doc: 'The database connection string',
      format: String,
      default: 'mongodb://root:toor@localhost:27017/development-db?authSource=admin',
      env: 'DATABASE_URL',
    },
  },
});
