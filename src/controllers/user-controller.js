import bcrypt from 'bcryptjs';

import model from '../models/user-model';
import generateJwt from '../utils/generateJwt';
import serializeUserData from '../utils/serialize-user-data';

export default {
  search: async (req, res, next) => {
    try {
      const { accessToken } = req;
      const { id } = req.params;
      const user = await model.findById(id);

      const isTokenValid = await bcrypt.compare(user.token, accessToken);

      if (isTokenValid) {
        const minutesSinceLastLogin = (
          Date.now()
          - user.ultimo_login.getTime()
        ) / 60000;

        if (minutesSinceLastLogin > 30) {
          return next({
            status: 401,
            message: 'Sessão inválida',
          });
        }
        res.locals = {
          status: 200,
          data: serializeUserData(user),
        };
        return next();
      }

      return next({
        status: 401,
        message: 'Não autorizado',
      });
    } catch (error) {
      return next({
        status: 500,
        message: error.message,
      });
    }
  },
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

      const newToken = generateJwt({ email, senha });
      const tokenHash = await bcrypt.hash(newToken, 10);

      user.set('ultimo_login', Date.now());
      user.set('token', tokenHash);
      user.save();

      res.locals = {
        ...res.locals,
        status: 200,
        data: serializeUserData(user),
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
      const token = generateJwt({ nome, email });
      const newUser = await model.create({
        nome,
        email,
        telefones,
        senha: hash,
        token,
      });

      res.locals = {
        status: 201,
        data: serializeUserData(newUser),
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
