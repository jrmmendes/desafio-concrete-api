import mongoose from 'mongoose';

export default async (connectionString) => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);

  const connection = await mongoose.connect(connectionString);

  return connection;
};
