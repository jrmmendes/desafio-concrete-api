import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import errorHandler from './helpers/errorHandler';
import notFoundHandler from './helpers/notFoundHandler';
import requestHandler from './helpers/requestHandler';

import initSwagger from './config/swagger';
import settings from './config/settings';

import userRoutes from './routes/users';

class ApplicationController {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();

    if (settings.get('env') !== 'test') initSwagger('/', this.app);

    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
    this.app.use(requestHandler);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));
  }

  routes() {
    this.app.use(userRoutes);
  }
}

export default new ApplicationController().app;
