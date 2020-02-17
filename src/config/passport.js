import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import settings from './settings';
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

export default (passport) => {
  const options = {};
  const { appSecret } = settings.get('security');
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = appSecret;
  options.passReqToCallback = true;

  passport.use(new JwtStrategy(options, validateUser));
};
