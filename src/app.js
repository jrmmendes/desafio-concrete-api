import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import bearerToken from 'express-bearer-token';

import errorHandler from './helpers/errorHandler';
import notFoundHandler from './helpers/notFoundHandler';
import requestHandler from './helpers/requestHandler';

import initSwagger from './config/swagger';

import userRoutes from './routes/users';

class ApplicationController {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();

    initSwagger('/docs', this.app);

    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
    this.app.use(requestHandler);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(bearerToken({ reqKey: 'accessToken' }));
  }

  routes() {
    this.app.use(userRoutes);
  }
}

export default new ApplicationController().app;
