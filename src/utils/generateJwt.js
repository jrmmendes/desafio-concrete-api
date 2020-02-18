import jwt from 'jsonwebtoken';
import settings from '../config/settings';

export default (payload) => {
  const { appSecret, tokenExpirationTime } = settings.get('security');
  const token = jwt.sign(payload, appSecret, {
    expiresIn: tokenExpirationTime,
  });

  return token;
};
