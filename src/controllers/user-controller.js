import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import settings from '../config/settings';
import model from '../models/user-model';

export default {
  detail: async (req, res, next) => {
    try {
      const userId = req.param;

      const user = await model.findById(userId);

      if (!user) {
        return next({
          status: 404,
          data: `O usuário com id ${userId} não foi encontrado`,
        });
      }

      res.locals = {
        ...res.locals,
        status: 200,
        data: user,
      };

      return next();
    } catch (error) {
      return next({
        message: error.message,
        status: 500,
      });
    }
  },
  create: async (req, res, next) => {
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
