import mongoose from 'mongoose';
import settings from './settings';

export default async () => {
  const { connectionString } = settings.get('db');

  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);

  const connection = await mongoose.connect(connectionString);

  return connection;
};
