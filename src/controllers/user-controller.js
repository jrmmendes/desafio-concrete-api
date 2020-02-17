import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import settings from '../config/settings';
import model from '../models/user-model';

export default {
  signIn: async (req, res, next) => {
    try {
      const { email, senha } = req.body;

      const user = await model.findOne({ email });

      if (!user) {
        return next({
          status: 401,
          message: 'Usuário e/ou senha inválidos',
        });
      }

      const hash = user.senha;

      if (!await bcrypt.compare(senha, hash)) {
        return next({
          status: 401,
          message: 'Usuário e/ou senha inválidos',
        });
      }

      const userData = user.toObject();
      const { appSecret, tokenExpirationTime } = settings.get('security');
      const { _id: userId } = userData;

      const token = jwt.sign({ userId }, appSecret, {
        expiresIn: tokenExpirationTime,
      });

      res.locals = {
        ...res.locals,
        status: 200,
        data: {
          ...userData,
          token,
        },
      };

      return next();
    } catch (error) {
      return next({
        message: error.message,
        status: 500,
      });
    }
  },
  signUp: async (req, res, next) => {
    try {
      const {
        nome,
        email,
        senha,
        telefones,
      } = req.body;

      const hash = await bcrypt.hash(senha, 10);

      const userWithSameEmail = await model.findOne({ email });
      if (userWithSameEmail) {
        return next({
          status: 400,
          message: 'E-mail já existente',
        });
      }

      const newUser = await model.create({
        nome,
        email,
        telefones,
        senha: hash,
      });

      const userData = newUser.toObject();
      const { appSecret, tokenExpirationTime } = settings.get('security');
      const { _id: userId } = userData;

      const token = jwt.sign({ userId }, appSecret, {
        expiresIn: tokenExpirationTime,
      });

      res.locals = {
        status: 201,
        data: {
          ...userData,
          token,
        },
      };

      return next();
    } catch (error) {
      return next({
        message: error.message,
        status: 500,
      });
    }
  },
};
