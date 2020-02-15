import mongoose from 'mongoose';
import config from '../config';

export default async (req, res, next) => {
  try {
    const db = config.get('db');

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    await mongoose.connect(db.url);
    res.locals.mongoose = mongoose;

    return next();
  } catch (error) {
    return next(error);
  }
};
