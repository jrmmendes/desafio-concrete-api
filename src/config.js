import convict from 'convict';

export default convict({
  env: {
    docs: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  db: {
    url: {
      doc: 'The database connection string',
      format: String,
      default: 'mongodb://root:toor@localhost:27017/development-db?authSource=admin',
      env: 'DATABASE_URL',
    },
  },
});
