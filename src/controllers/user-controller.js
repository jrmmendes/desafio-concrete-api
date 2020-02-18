import bcrypt from 'bcryptjs';

import model from '../models/user-model';
import generateJwt from '../utils/generateJwt';

export default {
  search: async (req, res, next) => {
    try {
      const { accessToken } = req;
      const { id } = req.params;
      const user = await model.findById(id);

      if (!user) {
        return next({
          status: 404,
          message: 'Usuário não encontrado',
        });
      }

      const isTokenValid = await bcrypt.compare(accessToken, user.token);

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
          data: {
            id: user._id,
            nome: user.nome,
            email: user.email,
            ultimo_login: user.ultimo_login,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            telefones: user.telefones,
          },
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

      if (!email || !senha) {
        return next({
          status: 401,
          message: 'Usuário e/ou senha inválidos',
        });
      }

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

      const token = generateJwt({ email, senha });
      const tokenHash = await bcrypt.hash(token, 10);

      user.set('ultimo_login', Date.now());
      user.set('token', tokenHash);
      user.save();

      res.locals = {
        ...res.locals,
        status: 200,
        data: {
          id: user._id,
          nome: user.nome,
          email: user.email,
          ultimo_login: user.ultimo_login,
          data_criacao: user.data_criacao,
          data_atualizacao: user.data_atualizacao,
          telefones: user.telefones,
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
      const token = generateJwt({ nome, email });
      const tokenHash = await bcrypt.hash(token, 10);

      const newUser = await model.create({
        nome,
        email,
        telefones,
        senha: hash,
        token: tokenHash,
      });

      res.locals = {
        status: 201,
        data: {
          id: newUser._id,
          nome: newUser.nome,
          email: newUser.email,
          ultimo_login: newUser.ultimo_login,
          data_criacao: newUser.data_criacao,
          data_atualizacao: newUser.data_atualizacao,
          telefones: newUser.telefones,
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
