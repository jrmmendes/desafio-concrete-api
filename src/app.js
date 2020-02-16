import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import datasource from './middlewares/datasource';
import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import requestHandler from './middlewares/requestHandler';

import userRoutes from './routes/users';

class ApplicationController {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();

    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
    this.app.use(requestHandler);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));

    this.app.use(datasource);
  }

  routes() {
    this.app.use(userRoutes);
  }
}

export default new ApplicationController().app;
