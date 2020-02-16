import bcrypt from 'bcryptjs';
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

      res.locals = {
        ...res.locals,
        data: newUser.toObject(),
        status: 201,
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
