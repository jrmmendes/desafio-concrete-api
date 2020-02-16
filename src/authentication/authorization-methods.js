import { Strategy, ExtractJwt } from 'passport-jwt';

import config from '../config';
import model from '../models/user-model';

export const validateUser = async (request, jwtPayload, done) => {
  try {
    const user = await model.findById(jwtPayload.userId);
    if (!user) {
      return done({ isAuthDenied: true });
    }
    request.res.locals.user = user;
    return done(null, request.res.locals.user);
  } catch (error) {
    return done(error);
  }
};

export const authorize = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = config.get('app_secret');
  options.passReqToCallback = true;

  passport.use(new Strategy(options, validateUser));
};
