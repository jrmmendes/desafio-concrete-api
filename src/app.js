import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import datasource from './middlewares/datasource';

class ApplicationController {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));

    this.app.use(datasource);
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('Hello');
    });
  }
}

export default new ApplicationController().app;
